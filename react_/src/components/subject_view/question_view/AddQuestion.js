import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./AddQuestion.css";
import FormData from "form-data";
export default class AddQuestion extends Component {
  state = {
    selectedFile: null,
    difficulty_level: "Easy",
    err: [],
  };
  componentDidMount() {
    this.setState({
      selectedFile: null,
      difficulty_level: "Easy",
      question: "",
      mark: "",
    });
  }
  changeValue = (value) => {
    this.setState({ difficulty_level: value });
  };
  // on file select
  onFileChange = (event) => {
    // Update the state selected file
    this.setState({ selectedFile: event.target.files[0] });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value, this.state.difficulty_level);
  };
  
  onSubmit = (e) => {
    e.preventDefault();

    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("question", this.state.question);
    if (this.state.selectedFile !== null) {
      formData.append("diagram1", this.state.selectedFile);
    }
    formData.append("mark", this.state.mark);
    formData.append("difficult_level", this.state.difficulty_level);
    const token = localStorage.getItem("token");
    // Details of the uploaded file
    console.log("sss", this.state);
    console.log("formdata", formData);
    // configurations
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `Token ${token}`,
      },
    };
    let idi = this.props.subject_id;

    // Request made to the backend api
    // Send formData object
    axios
      .post(
        `http://127.0.0.1:8000/api_view/subjects/${idi}/questions/`,
        formData,
        config
      )
      .then((res) => {
        let newQuestion = res.data;
        let newList = [...this.props.questions, newQuestion];
        console.log("newlist", newList);
        this.props.updateQuestion(newList);
      })
      .catch((err) => {
        this.setState({ err: err.data });
      });
  };
  render() {
    return (
      <div>
        <form className="question-form" onSubmit={this.onSubmit}>
          <center>
            <div className="question-name">
              <label>
                Add Your Question :
                <input
                  type="text"
                  name="question"
                  placeholder="Add Question..."
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <div>
              <label>
                Mark of Question:
                <input
                  type="text"
                  name="mark"
                  placeholder="Add Mark of the Question..."
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <label>
              Select difficulty Level:{" "}
              <select
                className="select"
                name="difficulty_level"
                value={this.state.difficulty_level}
                onChange={this.onChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Diffucult">Difficult</option>
              </select>
            </label>
            <br />
            <input type="file" onChange={this.onFileChange} className="file" />
            {console.log(this.state.selectedFile)}
            <br />
            <Button variant="info" className="button" type="submit">
              Submit
            </Button>
          </center>
        </form>
      </div>
    );
  }
}
