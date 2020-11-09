import React, { Component } from 'react'
import Button from "react-bootstrap/Button";

export default class AddSubject extends Component {
 state = {
  name : ''
 }
 onChange = (e) => this.setState({ [e.target.name]: e.target.value });
 onSubmit = (e) => {
  e.preventDefault();
  this.props.addSubject(this.state.name);
  this.setState({ name: "" });
};
 
 render() {
  return (
   <div >
    <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="name"
          style={{ flex: "10", padding: "15px" }}
          placeholder="Add Subject name.."
          value={this.state.name}
          onChange={this.onChange}
        />
        <Button variant="info"  type="submit">Submit</Button>
      </form>
   </div>
  )
 }
}
