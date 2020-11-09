import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export class TodoItem extends Component {
  state = {
    edit: false,
    id: null,
    title: "",
  };

  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "2px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };
  };

  btnStyle = () => {
    return {
      background: "red",
      padding: "10px 2px",
      float: "right",
    };
  };
  editBtnStyle = () => {
    return {
      background: "green",
      padding: "10px 2px",
      float: "right",
    };
  };
  handleEdit = (e) => {
    console.log("sadsdsadsa");
    this.setState({
      id: this.props.todo.id,
      edit: true,
      title: this.props.todo.title,
    });
    console.log(this.props.todo.id, this.state);
  };
  onSubmit = (e) => {
    const idi = this.state.id;
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api_view/todo/${idi}/`, {
        title: this.state.title,
      })
      .then((err) => {
        console.log(err);
      })
      .then(this.setState({ edit: false }))
      .then((this.props.todo.title = this.state.title));
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { id, title, completed } = this.props.todo;
    return this.state.edit ? (
      <div>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            defaultValue={this.props.todo.title}
            //  value={this.state.title}
            name="title"
            style={{ flex: "10", padding: "15px" }}
            onChange={this.onChange}
          />

          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    ) : (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id, title, completed)}
          />{" "}
          {title}
          <button
            onClick={this.props.delTodo.bind(this, id)}
            style={this.btnStyle()}
          >
            Delete
          </button>
          <button onClickCapture={this.handleEdit} style={this.editBtnStyle()}>
            Edit
          </button>
        </p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
