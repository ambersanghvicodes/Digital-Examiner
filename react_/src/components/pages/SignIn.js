import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const coff = <FontAwesomeIcon icon="coffee" />;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

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
