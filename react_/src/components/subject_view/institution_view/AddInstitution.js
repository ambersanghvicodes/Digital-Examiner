import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default class AddInstitution extends Component {
  state = {
    institute_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.institute_name === "") {
      window.alert("Enter a institute name.");
    } else if (this.state.address === "") {
      window.alert("Enter address of institute.");
    } else if (this.state.city === "") {
      window.alert("Enter city name. ");
    } else if (this.state.state === "") {
      window.alert("Enter state name.");
    } else if (this.state.country === '') {
      window.alert("Enter Country name");
    } else {
      this.props.submitInstitution(
        this.state.institute_name,
        this.state.address,
        this.state.city,
        this.state.state,
        this.state.country
      );
    }
  };
  render() {
    const { institute_name, address, city, state, country } = this.state;
    return (
      <div>
        <center>
          <h3 style={{ padding: "10px" }}>Enter Details for Institution </h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group as={Row} controlId="formHorizontalNumber">
              <Form.Label column sm={3}>
                Institution Name :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter a institution name"
                  defaultValue={this.state.institute_name}
                  name="institute_name"
                  onChange={this.onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalNumber">
              <Form.Label column sm={3}>
                Address :
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter Address: "
                  defaultValue={this.state.address}
                  name="address"
                  onChange={this.onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column xs="auto">
                City:
              </Form.Label>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  defaultValue={this.state.city}
                  name="city"
                  onChange={this.onChange}
                />
              </Col>
              <Form.Label column xs="auto">
                State:
              </Form.Label>
              <Col xs={2}>
                <Form.Control
                  type="text"
                  placeholder="Add State name "
                  defaultValue={this.state.state}
                  name="state"
                  onChange={this.onChange}
                />
              </Col>
              <Form.Label column xs="auto">
                Country:
              </Form.Label>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  placeholder="Add Country name "
                  defaultValue={this.state.country}
                  name="country"
                  onChange={this.onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <hr />
              <Button type="submit" variant="success">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </center>
      </div>
    );
  }
}
