import React, { Component } from "react";
import Fields from "./Fields";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

export default class AddPattern extends Component {
  state = {
    title: "",
    tm: 0,
    noq: 0,
    nos: 0,
    mark_array: "",
    question_array: "",
    noqsform: true,
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.title === "") {
      window.alert("Enter a title for pattern.");
    } else if (this.state.tm === 0) {
      window.alert("Total marks cannot be zero.");
    } else if (this.state.noq === 0) {
      window.alert("Number  of Questions cannot be 0. ");
    } else if (this.state.nos === 0) {
      window.alert("Number of Sections cannot be 0.");
    } else if (this.state.nos < this.state.noq) {
      window.alert(
        "Number of Questions cannot be less than number of Sections."
      );
    } else {
      this.setState({ noqsform: false });
    }
  };
  backButton = () => {
    this.setState({ noqsform: true });
  };
  addSections = (sections) => {
    let sec_mrk = 0;
    let sec_qus = 0;
    sections.map((mk) => {
      sec_mrk += mk.mrk * mk.nuoqu;
      sec_qus += parseInt(mk.nuoqu);
    });
    console.log(sec_mrk,this.state.tm, sec_qus, this.state.noq);
    if (sec_mrk.toString() !== this.state.tm) {
      window.alert(
        "Total Marks of Question Paper is not equal to the sum of section. Check Again...!"
      );
    } else if (sec_qus.toString() !== this.state.noq) {
      window.alert(
        "Total number of Questions is not equal to the sum of questions entered in sections. Check again...! "
      );
    } else {
      let markar = "";
      let quesar = "";
      sections.map((mk) => {
        markar += "Z" + mk.mrk.toString();
        quesar += "Z" + mk.nuoqu.toString();
      });
      markar = markar.slice(1);
      quesar = quesar.slice(1);

      this.setState({ noqsform: true });
      // this.props.closeBtn;
      this.props.submitPattern(
        this.state.nos,
        this.state.noq,
        this.state.tm,
        this.state.title,
        markar,
        quesar
      );
    }
  };
  render() {
    return (
      <>
        <center>
          <h3 style={{ padding: "10px" }}>Enter Details for Pattern </h3>
        </center>
        {this.state.noqsform ? (
          <div>
            <center>
              <Form onSubmit={this.onSubmit}>
                <Form.Group as={Row} controlId="formHorizontalNumber">
                  <Form.Label column sm={3}>
                    Enter a title :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter a title"
                      defaultValue={this.state.title}
                      name="title"
                      onChange={this.onChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalNumber">
                  <Form.Label column sm={3}>
                    Enter total marks :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      placeholder="Enter Total Marks: "
                      defaultValue={this.state.tm}
                      name="tm"
                      onChange={this.onChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column xs="auto">
                    Number of Questions:
                  </Form.Label>
                  <Col xs="auto">
                    <Form.Control
                      type="number"
                      placeholder="Add Number of Questions "
                      defaultValue={this.state.noq}
                      name="noq"
                      onChange={this.onChange}
                    />
                  </Col>
                  <Form.Label column xs="auto">
                    Number of Sections:
                  </Form.Label>
                  <Col xs={3}>
                    <Form.Control
                      type="number"
                      placeholder="Add Total number of Sections "
                      defaultValue={this.state.nos}
                      name="nos"
                      onChange={this.onChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{ marginLeft: "auto", marginRight: "20px" }}
                      className="pull-right"
                      type="submit"
                      variant="warning"
                    >
                      Next
                    </Button>
                  </div>
                </Form.Group>
              </Form>
              {/* <form onSubmit={this.onSubmit}>
                <label>Number of Question : </label>
                <input
                  type="text"
                  placeholder="Add Number of Questions "
                  defaultValue={this.state.noq}
                  name="noq"
                  onChange={this.onChange}
                />{" "}
                <br />
                <label>Number of Sections : </label>
                <input
                  type="text"
                  placeholder="Add Total number of Sections "
                  defaultValue={this.state.nos}
                  name="nos"
                  onChange={this.onChange}
                />
                <br />
                <button type="Submit">Next</button>
              </form> */}
            </center>
          </div>
        ) : (
          <>
            <Fields
              nos={this.state.nos}
              addSections={this.addSections}
              backButton={this.backButton}
            />
          </>
        )}
      </>
    );
  }
}
