import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import SubjectItem from "./SubjectItem";
import SubjectList from "./SubjectList";
import AddSubject from "./AddSubject";
import Button from "react-bootstrap/Button";

class Subjects extends Component {
  state = {
    subjects: [],
    showAdd: false,
  };
  componentDidMount = () => {
    let token = localStorage.getItem("token");
    console.log("tokennnnn", token);
    axios
      .get(`http://127.0.0.1:8000/api_view/subjects/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ subjects: res.data }))
      .catch((err) => {
        console.log(err);
      });
  };
  delSubject = (id) => {
    let token = localStorage.getItem('token')
    axios
      .delete(`http://127.0.0.1:8000/api_view/subjects/${id}/`,{
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) =>
        this.setState({
          subjects: [...this.state.subjects.filter((subject) => subject.id !== id)],
        })
      );
  };
  addSubject = (name) => {
    let token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/api_view/subjects/",
        {
          name: name,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) =>
        this.setState({ subjects: [...this.state.subjects, res.data] })
      )
      .then(
        this.setState({showAdd : false})
      );
  };

  render() {
    return (
      <div>
        {this.props.userLoggedIn ? (
          <div>
            <br />
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "red",
              }}
            >
              <u>List of Subjects</u>
            </h1>
            <div>
              <br />
              <SubjectList
                subjects={this.state.subjects}
                editSubject={this.editSubject}
                delSubject={this.delSubject}
              />
              {this.state.showAdd ? (
                <React.Fragment>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "whitesmoke",
                      float: "right",
                    }}
                    onClick={() => {
                      this.setState({ showAdd: false });
                    }}
                  >
                    X
                  </button>
                  <AddSubject addSubject={this.addSubject} />
                </React.Fragment>
              ) : (
                <div>
                  <center>
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.setState({ showAdd: true });
                      }}
                    >
                      Add Subject
                    </Button>
                  </center>
                </div>
              )}
            </div>
          </div>
        ) : (
          <React.Fragment>
            <Alert variant="danger" style={{ textAlign: "center" }}>
              Unauthorized to access this page.{" "}
              <Alert.Link href="/login">Login</Alert.Link> to access.
            </Alert>
          </React.Fragment>
        )}
      </div>
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
export default connect(mapStateToProps, null)(Subjects);
