import React, { Component } from "react";
import QuestionItem from "./QuestionItem";
import './QuestionList.css'
export default class QuestionList extends Component {
  render() {
    return (
      <div className='questions'>
          <h1 style={{ color: "#fd0122", paddingTop:'10px', fontWeight:'bolder' }}>
            List of questions for <u><mark>{this.props.subject_name}</mark> </u>
          </h1>
        {this.props.questions.map((question) => (
          <QuestionItem key={question.id} delQuestion={this.props.delQuestion} question={question} />
        ))}
      </div>
    );
  }
}
