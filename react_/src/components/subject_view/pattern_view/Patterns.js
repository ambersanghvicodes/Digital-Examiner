import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import PatternList from "./PatternList";
import axios from "axios";
import AddPattern from "./AddPattern";
import "./Patterns.css";
export default class Patterns extends Component {
  state = {
    addPattern: false,
    patterns: [],
  };
  componentDidMount = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api_view/patterns/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ patterns: res.data });
      })
      .then((err) => {
        console.log(err);
      });
  };
  submitPattern = (nos, noq, tm, title, markar, quesar) => {
    let data = {
      nos: nos,
      title: title,
      tm: tm,
      noq: noq,
      mark_array: markar,
      question_array: quesar,
    };
    console.log(data);
    const token = localStorage.getItem("token");

    this.setState({ addPattern: false });
    axios
      .post(`http://127.0.0.1:8000/api_view/patterns/`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ patterns: [...this.state.patterns, res.data] });
      })
      .then((err) => {
        console.log(err);
      });
  };
  dltPattern = (id) => {
    let token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/api_view/patterns/${id}/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState((state) => ({
          patterns: [...state.patterns.filter((pattern) => pattern.id !== id)],
        }));
      })
      .then(window.alert("Pattern Deleted Successfully."));
  };
  render() {
    return (
      <div>
        <Modal
          size="lg"
          show={true}
          aria-labelledby="example-modal-sizes-title-lg"
          style={{ backgroundColor: "#625D52" }}
        >
          <Modal.Header>
            <Modal.Title
              style={{ color: "red" }}
              id="example-modal-sizes-title-lg"
            >
              List of Patterns
            </Modal.Title>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Header>
          <Modal.Body>
            <div>
              <center>(click on the checkbox to select one)</center>
              {this.state.patterns.map((pattern) => (
                <PatternList
                  key={pattern.id}
                  pattern={pattern}
                  changePattern={this.props.changePattern}
                  dltPattern={this.dltPattern}
                />
              ))}
              {this.state.addPattern ? (
                <>
                  <AddPattern
                    closeBtn={() => {
                      this.setState({ addPattern: false });
                    }}
                    submitPattern={this.submitPattern}
                  />
                </>
              ) : (
                <>
                  <center>
                    <Button
                      variant="success"
                      onClick={() => {
                        this.setState({ addPattern: true });
                      }}
                    >
                      Add Pattern
                    </Button>
                  </center>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
