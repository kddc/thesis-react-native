import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

class AnswerComponent extends Component {

  render() {
    const { answer } = this.props
    return (
      <View style={styles.question}>

        <View style={styles.content}>
          <Text style={styles.text}>
            {answer.text}
          </Text>
          <View style={styles.info}>
            <Text>Author: {(answer.author && answer.author.username) || 'Anonymous'}</Text>
          </View>
        </View>

      </View>
    );
  }

}

export default AnswerComponent

const styles = StyleSheet.create({
  question: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    flexDirection: 'row',
    alignItems: 'center'
  },
  upvotes: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 16,
    width: 64,
    flex: 1
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1abd80'
  },
  arrow: {
    marginLeft: -5,
    marginRight: 3,
    marginTop: 3,
  },
  content: {
    flex: 1,
    padding: 16
  },
  text: {
    fontWeight: '500'
  },
  info: {
    marginTop: 8,
    flexDirection: 'row',
    opacity: 0.5
  }
})
