import React, { Component } from "react";
import SubjectItem from "./SubjectItem";
import "./subjects.css";

export default class SubjectList extends Component {
  render() {
    return (
    <div className="subjects">
    {
      this.props.subjects.map((subject) => (
        <SubjectItem
          key={subject.id}
          subject={subject}
          editSubject={this.props.editSubject}
          delSubject={this.props.delSubject}
        />
      ))
    }
    </div>
  )}
}
