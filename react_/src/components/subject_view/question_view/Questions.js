import React, { Component } from "react";
import axios from "axios";
import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";
import Button from "react-bootstrap/esm/Button";
export default class Questions extends Component {
  state = {
    questions: [],
    subject_name: "",
    addBtn: false,
  };
  componentDidMount = () => {
    let idi = this.props.match.params.subjectId;
    let token = localStorage.getItem("token");
    console.log("idid", idi);
    this.setState({ subject_id: idi });
    axios
      .get(`http://127.0.0.1:8000/api_view/subjects/${idi}/questions/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ questions: res.data });
      })
      .then((err) => {
        console.log(err);
      });

    axios
      .get(`http://127.0.0.1:8000/api_view/subjects/${idi}/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ subject_name: res.data.name });
      })
      .then((err) => {
        console.log(err);
      });
  };
  delQuestion = (id) => {
    let idi = this.props.match.params.subjectId;
    let token = localStorage.getItem("token");
    axios
      .delete(
        `http://127.0.0.1:8000/api_view/subjects/${idi}/questions/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        this.setState({
          questions: [
            ...this.state.questions.filter((question) => question.id !== id),
          ],
        });
      })
      .then(window.alert("Question Deleted."));
  };
  updateQuestion = (newList) => {
    console.log("question", newList);
    this.setState({ questions: newList, addBtn: false });
  };
  render() {
    const params = this.props.match.params;
    return (
      <div>
        <br />
        <QuestionList
          delQuestion={this.delQuestion}
          subject_name={this.state.subject_name}
          questions={this.state.questions}
        />
        {this.state.addBtn ? (
          <AddQuestion
            questions={this.state.questions}
            updateQuestion={this.updateQuestion}
            subject_id={this.state.subject_id}
          />
        ) : (
          <center>
            <Button
              variant="primary"
              onClick={() => this.setState({ addBtn: true })}
            >
              {" "}
              Add Question{" "}
            </Button>
          </center>
        )}
      </div>
    );
  }
}
