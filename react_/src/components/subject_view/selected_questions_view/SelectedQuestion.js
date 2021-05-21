import React, { Component } from "react";
import "./SelectedQuestion.css";
export default class SelectedQuestion extends Component {
  render() {
    const { question, index } = this.props;
    return (
      <div className="sltd">
        <p className="question_no">Q.{index + 1}</p>{" "}
        <div className="two_row">
          <h5 className="sltd_question">{question.question}</h5>
          <p className="sltd_mark">Mark : {question.mark}</p>
        </div>
        {question.diagram1 !== null ? (
          <img src={question.diagram1} className="sltd_diagram" />
        ) : (
          <p style={{ fontWeight: "bolder" }} className="sltd_diagram">
            No image added
          </p>
        )}
        <hr/>
      </div>
    );
  }
}
