import React, { Component } from 'react';
import { baqend } from '../../baqend'

import QuestionListComponent from './QuestionListComponent'

class QuestionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    }
  }

  componentWillMount() {
    const { db } = this.props

    db.Question
      .find()
      .descending('upvotes')
      .resultList({ depth: 2 })
      .then((questions) => {
        this.setState({ questions })
      })
  }

  render() {
    return (
      <QuestionListComponent questions={this.state.questions} />
    )
  }
}

export default baqend(QuestionList);
