import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./Fields.css";
export default class Fields extends Component {
  state = {
    sections: [],
  };
  componentDidMount = () => {
    let nos = this.props.nos;
    console.log(nos);
    for (let i = 1; i <= nos; i++) {
      this.setState((state) => ({
        sections: [...state.sections, { mrk: 0, nuoqu: 0 }],
      }));
      console.log(this.state.sections);
    }
  };
  appendTo = () => {
    return this.state.sections.map((m, i) => (
      <div key={i}>
        <h4>Section {i + 1}</h4>
        <Form.Group as={Row} key={i} controlId="exampleForm.ControlInput1">
          <Col>
            <Form.Label>Enter Marks: </Form.Label>
            <Form.Control
              placeholder="Enter marks : "
              type="number"
              name="mrk"
              defaultValue={m.mrk}
              onChange={(e) => this.handleChange(e, i)}
            />
          </Col>
          <Col>
            <Form.Label>Number of Question</Form.Label>
            <Form.Control
              placeholder="Enter No Questions : "
              type="number"
              name="nuoqu"
              defaultValue={m.nuoqu}
              onChange={(e) => this.handleChange(e, i)}
            />
          </Col>
        </Form.Group>
        <hr />
      </div>
    ));
  };
  handleChange = (event, i) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    let sections = [...this.state.sections];
    sections[i] = { ...sections[i], [name]: value };
    this.setState({ sections });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let f = false;
    for (let i = 0; i < this.props.nos; i++) {
      if (this.state.sections[i].mrk === 0) {
        window.alert("Mark cannot be zero in section " + i+1  );
        f = true;
        break;
      } else if (this.state.sections[i].nuoqu === 0) {
        window.alert("No of questions cannot be 0 in section" + (+i + +1));
        f = true;
        break;
      }
    }
    if (!f) {
      this.props.addSections(this.state.sections);
    }
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          {this.appendTo()}
          <div style={{ display: "flex" }}>
            <Button
              variant="default"
              className="back-btn"
              onClick={this.props.backButton}
            >
              Back{" "}
            </Button>
            <Button
              style={{ marginLeft: "auto", marginRight: "20px" }}
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </div>
        </form>
        {/* {row.map((rw, index)=> (
     <div key={index}>{rw}</div>
     ))} */}
        {console.log(this.state.sections)}
      </>
    );
  }
}
