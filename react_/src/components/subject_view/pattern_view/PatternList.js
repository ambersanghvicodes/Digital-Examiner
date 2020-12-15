import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import "./PatternList.css";
export default class PatternList extends Component {
  state = {
    mark_question: [],
  };
  componentDidMount = () => {
    let a = this.props.pattern.mark_array.split("Z");
    console.log("INNNNN");
    let b = this.props.pattern.question_array.split("Z");
    console.log(a,b)
    for (let i = 0; i < a.length; i++) {
      this.setState((state)=>({
        mark_question : [...state.mark_question, [a[i],b[i]]]
      }))
      // this.state.mark_question.push([a[i], b[i]]);
    }
  };
  render() {
    const {
      title,
      tm,
      noq,
      nos,
      mark_array,
      question_array,
      id,
    } = this.props.pattern;

    return (
      <div className="pattern">
        <label>
          <input
            type="checkbox"
            onChange={this.props.changePattern.bind(this, id, title)}
          />{" "}
          Click Here to select.
        </label>
        <center>
          <h3 style={{color:'#303F9F'}}>{title}</h3>
        </center>
        <p>
          <span style={{ fontWeight: "bolder", paddingLeft: "10%" }}>
            No of Questions :{" "}
          </span>
          {noq}
          <span style={{fontWeight:'bolder',paddingLeft:'50px'}}>Total Marks : </span> {tm}
          <span
            style={{
              fontWeight: "bolder",
              float: "right",
              paddingRight: "10%",
            }}
          >
            No of Sections : {nos}
          </span>
        </p>
        {console.log(this.state.mark_question)}
        {this.state.mark_question.map((mk, no) => (
          <div key={no}>
            <center>
              <span style={{ fontWeight: "bold" }}>Mark : </span> {mk[0]}{" "}
              <span style={{ fontWeight: "bold" }}>
                Number of Questions for {mk[0]} mark :{" "}
              </span>{" "}
              {mk[1]}
            </center>
          </div>
        ))}
        <Button variant ='danger' onClick = {this.props.dltPattern.bind(this,id)} >Delete</Button>
      </div>
    );
  }
}
