import React, { Component } from "react";
import QuestionItem from "./QuestionItem";
import './QuestionList.css'
export default class QuestionList extends Component {
  render() {
    return (
      <div className='questions'>
          <h1 >
            List of questions
          </h1>
        {this.props.questions.map((question) => (
          <QuestionItem key={question.id} delQuestion={this.props.delQuestion} question={question} />
        ))}
      </div>
    );
  }
}
