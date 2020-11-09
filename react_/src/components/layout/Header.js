import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
class Header extends Component {
  styleLink = {
    color: "white",
    textAlign: "center",
  };

  headerStyle = {
    background: "black",
    color: "white",
    textAlign: "center",
    padding: "10px",
  };
  navRight = {
    float: "right",
  };
  render() {
    return (
      <div>
        <header style={this.headerStyle}>
          <h1 style={this.styleLink}>Digital Examiner</h1>
          <Link style={this.styleLink} to="/">
            Home
          </Link>{" "}
          |{" "}
          <Link style={this.styleLink} to="/about">
            {" "}
            About
          </Link>{" "}
          |{" "}
          <Link style={this.styleLink} to="plusminus">
            IncDec
          </Link>
          {this.props.isAuthenticated ? (
            <React.Fragment>
              {"   "}
              <Button type="primary">
                {" "}
                <Link to="/user_details" style={this.styleLink}>
                  User Details
                </Link>
              </Button>{" "}
              {"   "}
              <Button type="primary">
                <Link to="/logout"> Logout </Link>
              </Button>
              {"   "}
              <Button type="primary">
                <Link to="/subjects"> Your Subjects </Link>
              </Button>
            </React.Fragment>
          ) : (
            <Button type="primary">
              {" "}
              <Link to="/login" style={this.styleLink}>
                Login
              </Link>
            </Button>
          )}
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
