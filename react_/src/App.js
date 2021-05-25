import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import * as actions from "./components/store/actions/auth";
import axios from "axios";
import { connect } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Login from "./components/pages/Login";
import SignIn from "./components/pages/SignIn";
import Logout from "./components/pages/Logout";
import RegistrationForm from "./components/pages/Signup";
import "bootstrap/dist/css/bootstrap.css";
import UserDetails from "./components/pages/UserDetails";
import HomePage from "./components/pages/HomePage";
import Subjects from "./components/subject_view/Subjects";
import Questions from "./components/subject_view/question_view/Questions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <div className="container">
              <Route
                exact
                path="/login"
                render={(props) => <Login {...this.props} />}
              />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/SignIn" component={SignIn} />
              <Route exact path="/signup" component={RegistrationForm} />
              <Route exact path="/user_details" component={UserDetails} />
              <Route exact path="/subjects" component={Subjects} />

              <Route
                exact
                path="/subjects/:subjectId/questions/"
                component={Questions}
              />
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    id: state.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
