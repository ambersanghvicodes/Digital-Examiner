import React from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
// import { Form, Input, Button } from 'antd';
// import Icon from '@ant-design/icons';
import { connect } from "react-redux";
// import { NavLink } from 'react-router-dom';
import * as actions from "../store/actions/auth";
import { Link } from "react-router-dom";

// const FormItem = Form.Item;
// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Lottie from "react-lottie";
import animationData from "../../Animation/loading-animation.json";
import loginData from "../../Animation/login.json";
import "./Login.css";

class NormalLoginForm extends React.Component {
  state = {
    values: { username: "", password: "" },
  };

  componentDidMount() {
    actions.authCheckState();
    if (this.props.isAuthenticated) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.history)
    this.props.onAuth(this.state.values.username, this.state.values.password);
    this.isauth();
  };
  isauth = () => {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
  };

  inputChanged = (event) => {
    const cred = this.state.values;
    cred[event.target.name] = event.target.value;
    this.setState({ values: cred });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <Alert style={{ textAlign: "center" }} variant="danger">
          {this.props.error
            ? this.props.error.response.data.error_description
            : "Error Establishing Connection . Try Again"}
        </Alert>
      );
    }
    const responseFacebook = (response) => {
      console.log(response);
      this.props.onFacebookLogin(response.accessToken);
    };
    const responseGoogle = (response) => {
      console.log(response);
      this.props.onGoogleLogin(response.accessToken);
    };
    const responseFailed = () => {};

    // const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {console.log(this.props)}
        <br />
        {this.props.isAuthenticated ? (
          <React.Fragment>
            {window.alert("Login Successful. Visit Home .")}
            <Redirect to="/" />
          </React.Fragment>
        ) : (
          <div className="two-col">
            <div className="outer-box">
              <div className="inner-box">
                <center>
                  <h1 className="sign-in">
                    Sign In Here <i className="fa fa-sign-in" />{" "}
                  </h1>
                  {errorMessage}
                  <br />
                  {this.props.loading ? (
                    <React.Fragment>
                      <h1 style={{ color: "white" }}>Logging In...</h1>
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: animationData,
                          rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                          },
                        }}
                        height={250}
                        width={250}
                      />
                    </React.Fragment>
                  ) : (
                    <>
                      <FacebookLogin
                        appId="3671519843015368"
                        fields="name,email"
                        callback={responseFacebook}
                      />{" "}
                      {"\u00A0"}
                      <GoogleLogin
                        clientId="960607237094-ep41988jj6prp3gubiu4vq78gld9nqr4.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseFailed}
                      />
                      <br />
                      <br />
                      <form className="lgn-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <div className="input-group input-group-lg">
                            <div className="input-group-prepend">
                              <span className="input-group-text lgn-icon">
                                <i className="fa fa-user"></i>
                              </span>
                            </div>
                            <input
                              type="username"
                              name="username"
                              value={this.state.values.username}
                              onChange={this.inputChanged}
                              placeholder="Enter your Username"
                              style={{
                                borderColor: "transparent",
                                borderTopRightRadius: "2rem",
                                borderBottomRightRadius: "2rem",
                                borderBottomColor: "grey",
                              }}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-lg">
                            <div className="input-group-prepend">
                              <span className="input-group-text lgn-icon">
                                <i className="fa fa-lock "></i>
                              </span>
                            </div>
                            <input
                              type="password"
                              name="password"
                              onChange={this.inputChanged}
                              value={this.state.values.password}
                              placeholder="Password"
                              style={{
                                borderColor: "transparent",
                                borderTopRightRadius: "2rem",
                                borderBottomRightRadius: "2rem",
                                borderBottomColor: "grey",
                              }}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <p style={{ margin: "0 10%" }}>
                          <input
                            type="submit"
                            value="Submit"
                            style={{ borderRadius: "11%" }}
                            className="btn btn-success btn-block btn-lg"
                          />{" "}
                          <br /> or {"  "}{" "}
                          <Link to="/signup" className="borderLeftRight">
                            Register
                          </Link>
                        </p>
                        <br />
                      </form>
                    </>
                  )}
                </center>
              </div>
              <div className="second-col">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: loginData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={400}
                  width={400}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("loginstate", state);
  return {
    loading: state.loading,
    error: state.error,
    id: state.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
    onFacebookLogin: (accessToken) =>
      dispatch(actions.facebookLogin(accessToken)),
    onGoogleLogin: (accessToken) => dispatch(actions.googleLogin(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
