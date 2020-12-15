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
          {this.props.error.response.data.error_description}
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
        <br />
        {this.props.isAuthenticated ? (
          <React.Fragment>
            {window.alert("Already Logged in. Visit home")}
            <Redirect to="/" />
          </React.Fragment>
        ) : (
          <>
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
                      <br />
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
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
            </div>
            {/* <div
              style={{ padding: "10% 2px 10% 2px", backgroundColor: "skyblue" }}
            >
              <center>
                <Card bg={"dark"} text={"white"} className="mb-2 login-card">
                  <Card.Body>
                    {errorMessage}
                    {this.props.loading ? (
                      <React.Fragment>
                        <h1 style={{ color: "white" }}>Logging In...</h1>
                        <br />
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </React.Fragment>
                    ) : (
                      <div>
                        <h1 className="heading" style={{ color: "white" }}>
                          Login Here
                        </h1>
                        <br />

                        <br />
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </center>
            </div> */}
          </>
        )}
      </div>
    );
  }
}

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

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

// import { Form, Input, Button } from 'antd';
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// const Demo = () => {
//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (

//     </Form>
//   );
// };

// ReactDOM.render(<Demo />, mountNode);

// {this.props.loading ? (
//   <div>
//     <h1>Logging In...</h1>
//     <br />
//     <Spinner animation="border" role="status">
//       <span className="sr-only">Loading...</span>
//     </Spinner>
//   </div>
// ) : (
//   <div>
//     <h1>Login Here</h1>
//     <br />
//     <Form onSubmit={this.handleSubmit}>
//       <center style={{ paddingLeft: "30%" }}>
//         <Form.Group as={Row} controlId="formBasicUsername">
//           <Form.Label column sm={2}>
//             Username:{" "}
//           </Form.Label>
//           <Col style={{ marginLeft: "-3%" }} sm={5}>
//             <Form.Control
//               type="text"
//               name="username"
//               value={this.state.values.username}
//               onChange={this.inputChanged}
//               placeholder="Enter your Username"
//             />
//           </Col>
//         </Form.Group>

//         <Form.Group as={Row} controlId="formBasicPassword">
//           <Form.Label column sm={2}>
//             Password:{" "}
//           </Form.Label>
//           <Col style={{ marginLeft: "-3%" }} sm={5}>
//             <Form.Control
//               name="password"
//               type="password"
//               onChange={this.inputChanged}
//               value={this.state.values.password}
//               placeholder="Password"
//             />
//           </Col>
//         </Form.Group>
//       </center>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//       {"   "}
//       or {"  "}{" "}
//       <Link to="/signup" style={{ color: "red" }}>
//         Register
//       </Link>
//     </Form>
//   </div>
// )}

// <Form onSubmit={this.handleSubmit}>
//                           <center>
//                             <Form.Group
//                               as={Row}
//                               className="justify-content-md-center"
//                               controlId="formBasicUsername"
//                             >
//                               <Form.Label>Username:{"  "}</Form.Label>
//                               <Col xs lg="6">
//                                 <Form.Control
//                                   type="text"
//                                   name="username"
//                                   value={this.state.values.username}
//                                   onChange={this.inputChanged}
//                                   placeholder="Enter your Username"
//                                 />
//                               </Col>
//                             </Form.Group>

//                             <Form.Group
//                               as={Row}
//                               className="justify-content-md-center"
//                               controlId="formBasicPassword"
//                             >
//                               <Form.Label>Password: </Form.Label>
//                               <Col xs lg="6">
//                                 <Form.Control
//                                   name="password"
//                                   type="password"
//                                   onChange={this.inputChanged}
//                                   value={this.state.values.password}
//                                   placeholder="Password"
//                                 />
//                               </Col>
//                             </Form.Group>
//                           </center>
//                           <Button
//                             variant="primary"
//                             className="login-btn"
//                             type="submit"
//                           >
//                             Login
//                           </Button>
//                         </Form>
