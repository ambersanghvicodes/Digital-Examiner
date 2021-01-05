import React from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

// const coff = <FontAwesomeIcon icon="coffee" />;


export default function SignIn() {

  return (
    <>
      <br />
      <br />
      <br />
      <center>
        <h1>Sign In Here</h1>
      </center>
      <br />
      <form style={{ margin: "0 20%" }}>
        <div className="form-group">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span
                className="input-group-text "
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  borderBottomColor: "red",
                  borderBottomWidth:'2px',
                  // padding :'0 5px'
                }}
              >
                <i className="fa fa-user"></i>
              </span>
            </div>
            <input
              type="username"
              style={{ borderColor: "transparent", borderBottomColor:'grey' }}
              className="form-control"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  borderBottomColor: "red",
                  borderBottomWidth:'2px'
                }}
              >
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              style={{ borderColor: "transparent", borderBottomColor:'grey'  }}
              className="form-control"
              placeholder="Password "
            />
          </div>
        </div>
        <p style={{ margin: "0 20%" }}>
          <input
            type="submit"
            value="Submit"
            style={{ borderRadius: "11%" }}
            className="btn btn-success btn-block btn-lg"
          />
        </p>
      </form>
    </>
  );
}
