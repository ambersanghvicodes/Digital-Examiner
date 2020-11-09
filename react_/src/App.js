import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import * as actions from "./components/store/actions/auth";
import axios from "axios";
import { connect } from "react-redux";
import Header from "./components/layout/Header";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import RegistrationForm from "./components/pages/Signup";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import "bootstrap/dist/css/bootstrap.css";
import UserDetails from "./components/pages/UserDetails";
import Subjects from "./components/subject_view/Subjects";
import Questions from "./components/subject_view/question_view/Questions";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api_view/todo/")
      .then((res) => this.setState({ todos: res.data }))
      .then(this.props.onTryAutoSignup())
  }

  //  checkLogin = () => {
  //   return dispatch => {

  //     const token = localStorage.getItem('token');
  //     console.log('sajbks',token);
  //     if (token !== undefined) {
  //         const expirationDate = new Date(localStorage.getItem('expirationDate'));

  //         if ( expirationDate <= new Date() ) {
  //             (actions.logout());
  //         } else {
  //           // this.state.props.isAuthenticated ;
  //             (actions.authSuccess(token));
  //             (actions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
  //         }
  //     }
  // }
  //  }

  markComplete = (id, title, completed) => {
    axios
      .put(`http://127.0.0.1:8000/api_view/todo/${id}/`, {
        title: title,
        completed: !completed,
      })
      .then(
        this.setState({
          todos: this.state.todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
            return todo;
          }),
        })
      );
  };

  delTodo = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api_view/todo/${id}/`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };

  addTodo = (title) => {
    axios
      .post("http://127.0.0.1:8000/api_view/todo/", {
        title: title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header {...this.props}></Header>
            {console.log('tdodod',this.state)}
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  {console.log(this.props)}
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...this.props} />}
            />

            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={RegistrationForm} />
            <Route exact path="/user_details" component={UserDetails} />
            <Route exact path="/subjects" component={Subjects} />
            <Route exact path="/subjects/:subjectId/questions/" component={Questions} />

          </div>
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

// import About from './components/pages/About';
// import PlusMinus from './components/pages/PlusMinus';
// import UserRegistration from './components/pages/UserRegistration.js';

// import Login from './components/pages/Login.js';

// state = {
//   todos : []
//  }

//  componentDidMount() {
//   axios.get('http://127.0.0.1:8000/api_view/todo/')
//   .then(res=> this.setState({todos : res.data}))
//  }

//  markComplete = (id, title, completed) => {
//   axios.put(`http://127.0.0.1:8000/api_view/todo/${id}/`, {title : title, completed : !completed})
//   .then(this.setState({ todos : this.state.todos.map(todo => {
//      if (todo.id === id) {
//        todo.completed = !todo.completed
//      }
//      return todo;
//    }) }))
//  }

// delTodo = (id) => {
//     axios.delete(`http://127.0.0.1:8000/api_view/todo/${id}`)
//       .then(res=>this.setState({ todos : [...this.state.todos.filter(todo => todo.id !== id)]}));
// }

// addTodo = (title) => {
//   axios.post('http://127.0.0.1:8000/api_view/todo/',{'title' : title, 'completed' : false})
//   .then(res=>this.setState({ todos : [...this.state.todos, res.data]}));
// }

//         <Route exact path = "/about" component = {About} />
//         <Route exact path = "/plusminus" component = {PlusMinus} />
//         <Route exact path = '/register' component = {UserRegistration} />
//         <Route exact path = '/login' component = {Login} />


// (
//   <div
//     style={{ padding: "10% 2px 10% 2px", backgroundColor: "skyblue" }}
//   >
//     <center>
//       <Card
//         bg={"dark"}
//         text={"white"}
//         style={{ width: "30rem", borderRadius: "5%" }}
//         className="mb-2"
//       >
//         <Card.Body>
//           {errorMessage}
//           {this.props.loading ? (
//             <React.Fragment>
//               <h1 style={{ color: "white" }}>Logging In...</h1>
//               <br />
//               <Spinner animation="border" role="status">
//                 <span className="sr-only">Loading...</span>
//               </Spinner>
//             </React.Fragment>
//           ) :
//           (
//             this.success ? 
//             <div>
                
//             </div>
//           ) : (
//             <div>
//               <h1 style={{ color: "white" }}>Login Here</h1>
//               <br />
//               <Form onSubmit={this.handleSubmit}>
//                 <center>
//                   {/* Username */}
//                   <Form.Group
//                     as={Row}
//                     className="justify-content-md-center"
//                     controlId="formBasicUsername"
//                   >
//                     <Form.Label>Username:{"  "}</Form.Label>
//                     <Col xs lg="6">
//                       <Form.Control
//                         type="text"
//                         name="username"
//                         required = {true}
//                         value={this.state.values.username}
//                         onChange={this.inputChanged}
//                       />
//                     </Col>
//                   </Form.Group>
//                   {/* Email */}
//                   <Form.Group
//                     as={Row}
//                     className="justify-content-md-center"
//                     controlId="formBasicEmail"
//                   >
//                     <Form.Label>Username:{"  "}</Form.Label>
//                     <Col xs lg="6">
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         required = {true}
//                         value={this.state.values.email}
//                         onChange={this.inputChanged}
//                       />
//                     </Col>
//                   </Form.Group>

//                   <Form.Group
//                     as={Row}
//                     className="justify-content-md-center"
//                     controlId="formBasicPassword"
//                   >
//                     <Form.Label>Password: </Form.Label>
//                     <Col xs lg="6">
//                       <Form.Control
//                         name="password"
//                         type="password"
//                         onChange={this.inputChanged}
//                         value={this.state.values.password}
//                         placeholder="Password"
//                       />
//                     </Col>
//                   </Form.Group>
//                   <Form.Group
//                     as={Row}
//                     className="justify-content-md-center"
//                     controlId="formBasicPassword"
//                   >
//                     <Form.Label>Password: </Form.Label>
//                     <Col xs lg="6">
//                       <Form.Control
//                         name="confirm"
//                         type="password"
//                         onChange={this.inputChanged}
//                         value={this.state.values.confirm}
//                         placeholder="Password"
//                       />
//                     </Col>
//                   </Form.Group>
//                 </center>
//                 <Button
//                   variant="primary"
//                   className="login-btn"
//                   type="submit"
//                 >
//                   SignUp
//                 </Button>
//               </Form>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </center>
//   </div>
// )