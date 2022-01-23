import React from "react";
import Form from "./Form";
import Joi from "joi-browser";
import { registerUser } from '../RentalServices';

class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      phoneNumber: ""
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
      .max(50)
      .required(),
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    phoneNumber: Joi.string()
      .min(7)
      .max(50)
      .required()
  };
  submutHandler = e => {
    e.preventDefault();
    const data = { ...this.state.data };
    registerUser(data);
    this.props.history.push('/login')
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.submutHandler}>
          {this.inputBuilder("Email address", "email")}
          {this.inputBuilder("Password", "password")}
          {this.inputBuilder("Name", "name")}
          {this.inputBuilder("Phone number", "phoneNumber")}
          <button disabled={this.submitDisabler()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
