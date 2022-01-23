import React from "react";
import Form from "./Form";
import Joi from "joi-browser";
import { loginUser } from "../RentalServices";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    error: {}
  };
  schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(7)
      .max(255)
      .required()
  };
  submutHandler = e => {
    e.preventDefault();
    loginUser(this.state.data)
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.submutHandler}>
          {this.inputBuilder("Email address", "email")}
          {this.inputBuilder("Password", "password")}
          <button disabled={this.submitDisabler()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
