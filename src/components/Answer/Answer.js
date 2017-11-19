import React, { Component } from 'react';
import { baqend } from '../../baqend'

import AnswerComponent from './AnswerComponent'

class Answer extends Component {

  render() {
    const { answer } = this.props
    return (
      <AnswerComponent answer={answer} />
    )
  }

}

export default baqend(Answer);
