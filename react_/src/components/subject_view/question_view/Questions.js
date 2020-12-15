import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Patterns from "../pattern_view/Patterns";
import Institutions from "../institution_view/Institutions";
import SelectedQuestions from "../selected_questions_view/SelectedQuestions";
import "./Questions.css";
class Questions extends Component {
  state = {
    questions: [],
    pattern: {},
    institute: {},
    subject_name: "",
    df_level: "Easy",
    addBtn: false,
    addQuestions: false,
    selectedInst: "None",
    selectedPattern: "None",
    generateQuestions: false,
    showPatterns: false,
    showInstitutions: false,
    showQuestions: false,
  };
  // componentDidUpdate = () => {
  //   console.log('cooooo')
  // }
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
  onChange = (e) => {
    this.setState({ df_level: e.target.value });
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
    this.setState({ questions: newList, addBtn: false });
    window.alert("Question Added Successfully.");
  };
  // addPatterns = () => {
  //   let token = localStorage.getItem('token')

  // }
  changePattern = (id, title) => {
    this.setState({ selectedPattern: title, showPatterns: false });
    let token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api_view/patterns/${id}/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ pattern: res.data });
      })
      .then((err) => {
        console.log(err);
      });
    console.log(this.state.pattern);
  };
  changeInstitution = (id, title) => {
    this.setState({ selectedInst: title, showInstitutions: false });
    let token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api_view/institutions/${id}/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ institute: res.data });
      })
      .then((err) => {
        console.log(err);
      });
    console.log(this.state.institute);
  };

  show = () => {
    if (this.state.showQuestions) {
      return (
        <>
          <QuestionList
            delQuestion={this.delQuestion}
            subject_name={this.state.subject_name}
            questions={this.state.questions}
          />
        </>
      );
    } else if (this.state.addQuestions) {
      return (
        <>
          <AddQuestion
            questions={this.state.questions}
            updateQuestion={this.updateQuestion}
            subject_id={this.state.subject_id}
            setFalse={() => this.setState({ addBtn: false })}
          />
        </>
      );
    }
  };
  onHide = () => {
    this.setState({ showPatterns: false });
  };
  onHide1 = () => {
    this.setState({ showInstitutions: false });
  };
  generate_pdf = () => {
    if (this.state.selectedPattern === "None") {
      window.alert('Select a pattern first.')
    }
    else if (this.state.selectedInst === 'None'){
      window.alert('Select a institution first.')
    }
    else{
      this.setState({generateQuestions : true})
    }
  };
  render() {
    const params = this.props.match.params;
    return (
      <>
        {this.props.userLoggedIn ? (
          <div>
            <>
              <center style={{ lineHeight: "50px" }}>
                <h5 style={{ color: "#4bb2f9" }}>
                  Subject :{" "}
                  <span style={{ fontSize: "xx-large", color: "#ff3f80" }}>
                    {this.state.subject_name}
                  </span>
                </h5>
              </center>
              <br />
              <div
                className="child grid-container"
                style={{ fontSize: "85px" }}
              >
                <h3 className="head add-question">Add Question</h3>
                <h3 className="head select">Select a Pattern</h3>
                <h3 className="head select-institution">
                  <center className="">
                    Select a Institute
                    <br /> Name
                  </center>
                </h3>
                <img
                  className="add-question-image"
                  src={require("./AddQuestion.png")}
                />
                <i className="fa fa-arrow-right arrow"></i>{" "}
                <img
                  className="select-image"
                  src={require("./Select.png")}
                  style={{ height: "185px" }}
                />
                <i className="fa fa-arrow-right arrow2"></i>{" "}
                <img
                  className="select-institution-image"
                  src={require("./institution.png")}
                  style={{ height: "150px" }}
                />
                <div className="add-question-text">
                  <center>
                    <p>
                      Number of Questions added : {this.state.questions.length}
                    </p>
                    <a href="#qus_section">
                      <Button
                        onClick={() =>
                          this.setState({
                            addQuestions: true,
                            showQuestions: false,
                          })
                        }
                        variant="success"
                      >
                        Add Question
                      </Button>
                    </a>{" "}
                    <a href="#qus_section">
                      <Button
                        onClick={() =>
                          this.setState({
                            addQuestions: false,
                            showQuestions: true,
                          })
                        }
                        variant="primary"
                      >
                        Show Questions
                      </Button>
                    </a>
                  </center>
                </div>
                <div className="select-pattern-text">
                  <center>
                    Selected Pattern : {this.state.selectedPattern} <br />
                    <br />
                    <Button
                      variant="success"
                      onClick={() => this.setState({ showPatterns: true })}
                    >
                      {" "}
                      Select Pattern{" "}
                    </Button>
                  </center>
                </div>
                <div className="select-institution-text">
                  <center>
                    Selected Institution : <br /> {this.state.selectedInst}{" "}
                    <br />
                    <Button
                      variant="success"
                      onClick={() => this.setState({ showInstitutions: true })}
                    >
                      Select Institution
                    </Button>
                  </center>
                </div>
                <hr className="hr" />
                <div className="df_level">
                  <h3 className="head">Select Difficulty Level</h3>
                </div>
                <img
                  className="df_level_image"
                  src={require("./df_level.png")}
                />
                <div className="df_level_txt">
                  Selected Difficult level : {this.state.df_level} <br />
                  <Row
                    style={{
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <Col>Change : </Col>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Control
                        as="select"
                        style={{
                          margin: "15px 0 0 -25px",
                          backgroundColor: "#334e68",
                          color: "white",
                        }}
                        defaultValue={this.state.df_level}
                        onChange={this.onChange}
                      >
                        <option style={{ backgroundColor: "#334e68" }}>
                          Easy
                        </option>
                        <option style={{ backgroundColor: "#334e68" }}>
                          Medium
                        </option>
                        <option style={{ backgroundColor: "#334e68" }}>
                          Hard
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Row>
                </div>
              </div>
              <br />
              <center>
                <button
                  style={{ fontSize: "xx-large" }}
                  className=" pdf-btn fa fa-file-pdf-o"
                  onClick={this.generate_pdf}
                >
                  {"  "} <span className="pdf">Generate PDF</span>
                </button>
              </center>
              <br />
              <div id="qus_section"></div>
              <br />
              <div>
                {this.state.generateQuestions ? (
                  <SelectedQuestions
                    pattern={this.state.pattern}
                    questions={this.state.questions}
                    institute={this.state.institute}
                    df_level={this.state.df_level}
                    onHide={() => {
                      this.setState({ generateQuestions: false });
                    }}
                  />
                ) : (
                  <></>
                )}
                {this.state.showPatterns ? (
                  <Patterns
                    onHide={this.onHide}
                    changePattern={this.changePattern}
                  />
                ) : (
                  <></>
                )}
                {this.state.showInstitutions ? (
                  <Institutions
                    onHide={this.onHide1}
                    changeInstitution={this.changeInstitution}
                  />
                ) : (
                  <></>
                )}
                {this.state.showQuestions ? (
                  <>
                    <QuestionList
                      delQuestion={this.delQuestion}
                      subject_name={this.state.subject_name}
                      questions={this.state.questions}
                    />
                  </>
                ) : (
                  <></>
                )}
                {console.log(this.state.institute, this.state.pattern)}
                {this.state.addQuestions ? (
                  <>
                    <>
                      <AddQuestion
                        questions={this.state.questions}
                        updateQuestion={this.updateQuestion}
                        subject_id={this.state.subject_id}
                        setFalse={() => this.setState({ addBtn: false })}
                      />
                    </>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* // Show Add Pattern Button */}
              <br />
            </>
          </div>
        ) : (
          <React.Fragment>
            <Alert variant="danger" style={{ textAlign: "center" }}>
              Unauthorized to access this page.{" "}
              <Alert.Link href="/login">Login</Alert.Link> to access.
            </Alert>
          </React.Fragment>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    id: state.id,
    userLoggedIn: state.userLoggedIn,
    token: state.token,
  };
};
export default connect(mapStateToProps, null)(Questions);
