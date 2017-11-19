import { NetInfo } from 'react-native'

import { WorkerCache } from 'react-native-speed-kit/src/caches/WorkerCache'
import { BloomFilterRefresher } from 'react-native-speed-kit/src/BloomFilterRefresher'
import RNRequestStorage from 'react-native-speed-kit/src/util/RNRequestStorage'
import RNFetchInterceptor from 'react-native-speed-kit/src/util/RNFetchInterceptor'

import { AsyncStorage } from 'react-native';

const isNetworkConnected = () => {
  return NetInfo.getConnectionInfo().then(reachability => {
    if (reachability.type === 'unknown') {
      return new Promise(resolve => {
        const handleFirstConnectivityChangeIOS = isConnected => {
          NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
      });
    }
    return (reachability.type !== 'none' && reachability.type !== 'unknown')
  });
}

let baqendCache
let bloomFilterRefresher
let storage = new RNRequestStorage()
let interceptor = new RNFetchInterceptor()

interceptor.addFetchListener(async (fetch, request) => {
  if (!baqendCache) {
    const bloomFilterUrl = 'https://proud-filet-mignon-324.app.baqend.com/v1/bloomfilter';
    const refreshInterval = 60000;
    baqendCache = new WorkerCache({disableLogging: false}, storage, fetch, isNetworkConnected)
    bloomFilterRefresher = new BloomFilterRefresher(baqendCache, bloomFilterUrl, refreshInterval);
  }
  await bloomFilterRefresher.ensureFreshness()
  return baqendCache.handleRequestTest(request)
})
