import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./AddQuestion.css";
import FormData from "form-data";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        authorization: `Bearer ${token}`,
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
      .then(() =>
        this.setState({
          selectedFile: null,
          difficulty_level: "Easy",
          question: "",
          mark: "",
        })
      )
      .catch((err) => console.log(err));
  };
  clear = () => {
    this.setState({
      selectedFile: null,
      difficulty_level: "Easy",
      question: "",
      mark: "",
    });
  };
  render() {
    return (
      <div className="OuterCard">
        <div className="InnerCard">
          <center>
            <h3 style={{ color: "#ff8e52" }}>Enter Question details...</h3>
          </center>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Add Question: </Form.Label>
              <Form.Control
                type="text"
                name="question"
                placeholder="Add Question here..."
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Mark of Question</Form.Label>
              <Form.Control
                type="number"
                name="mark"
                placeholder="Add Mark of the Question..."
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select difficulty level: </Form.Label>
              <Form.Control
                as="select"
                name="difficulty_level"
                value={this.state.difficulty_level}
                onChange={this.onChange}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Difficult</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Input Diagram file if any"
                onChange={this.onFileChange}
              />
            </Form.Group>
            <center>
              <Button variant="success" className="button" type="submit">
                Submit
              </Button>{" "}
            </center>
          </Form>
        </div>
      </div>
    );
  }
}
