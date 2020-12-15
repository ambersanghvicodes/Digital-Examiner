import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

export function Button(props) {
  let button = <div></div>;
  if (props.task === "login")
    button = (
      <Link to="/login">
        <button className="bttn">Login</button>
      </Link>
    );
  else if (props.task === "logout")
    button = (
      <Link to="/logout">
        <button className="bttn">Logout</button>
      </Link>
    );
  else {
    button = (
      <Link to="/signup">
        <button className="bttn">Register</button>
      </Link>
    );
  }
  return button;
}
