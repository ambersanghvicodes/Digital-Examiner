import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";

export default class InstitutionList extends Component {
  render() {
    const { name, address, city, state, country, id } = this.props.institution;
    return (
      <div className="pattern">
        <label>
          <input
            type="checkbox"
            onChange={this.props.changeInstitution.bind(this, id, name)}
          />{" "}
          Click Here to select.
          {console.log(id)}
        </label>
        <center>
          <h3 style={{ color: "#303F9F" }}>{name}</h3>
          {address}
        </center>
        <p style={{ fontWeight: "bolder", padding: "0 80px" }}>
          City : {city} <span style={{ float: "right" }}>State : {state}</span>
        </p>
        <center>
          <p>Country : {country}</p>
        <Button variant ='danger' onClick = {this.props.dltInstitution.bind(this,id)} >Delete</Button>
        </center>
      </div>
    );
  }
}
