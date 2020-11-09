import React, { Component } from "react";
import "./SubjectItem.css";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
export default class SubjectItem extends Component {
  state = {
    edit: false,
    name: "",
    id: null,
  };
  handleEdit = (e) => {
    console.log("sadsdsadsa");
    this.setState({
      id: this.props.subject.id,
      edit: true,
      name: this.props.subject.name,
    });
    console.log(this.props.subject.id, this.state);
  };
  onSubmit = (e) => {
    const idi = this.state.id;
    const token = localStorage.getItem('token')
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api_view/subjects/${idi}/`, {
        name: this.state.name,
      },{
        headers: { authorization: `Bearer ${token}` },
      })
      .then((err) => {
        console.log(err);
      })
      .then(this.setState({ edit: false }))
      .then((this.props.subject.name = this.state.name));
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { name, timestamp } = this.props.subject;
    const date = timestamp.split("T")[0];
    const time = timestamp.split("T")[1].slice(0, 5);
    return (
      <div className="subjectItem">
        {this.state.edit ? (
          <div>
            <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
              <input
                type="text"
                style={{ color: "black" }}
                defaultValue={this.props.subject.name}
                //  value={this.state.title}
                name="name"
                style={{ flex: "10", padding: "15px" }}
                onChange={this.onChange}
              />
              <Button variant="success" type="submit" style={{ flex: "1" }}>
                Submit
              </Button>
              <button
                style={{
                  backgroundColor: "red",
                  color: "whitesmoke",
                  width: "25px",
                  float: "right",
                }}
                onClick={() => {
                  this.setState({ edit: false });
                }}
              >
                X
              </button>
            </form>
            <br />
            Created on : {date}
            <br />
            Time : {time}
            <br />
          </div>
        ) : (
          <div>
            <Link
            style={{textDecoration:'none',}}
              to={{
                pathname: `/subjects/${this.props.subject.id}/questions/`,
                // state: {
                //   subject: this.props.subject,
                // }
              }}
            >
              <h2><span className='span'>{name}</span></h2>
            </Link>
            <br/>
            Created on : {date}
            <br />
            Time : {time}
            <br />
            <br />
            <Button variant="success" onClick={this.handleEdit}>
              Edit Subject Name
            </Button>{" "}
            {"  "}
            <span style={{ paddingLeft: "20px" }}></span>
            <Button
              variant="danger"
              onClick={this.props.delSubject.bind(this, this.props.subject.id)}
              type="submit"
            >
              Delete Subject
            </Button>
          </div>
        )}
      </div>
    );
  }
}
