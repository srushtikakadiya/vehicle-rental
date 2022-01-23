import React from "react";
import Form from "./Form";
import Joi from "joi-browser";

class NewRentals extends Form {
  state = {
    data: {
      rentalDays: ""
    },
    error: {}
  };
  schema = {
    rentalDays: Joi.number()
      .min(1)
      .max(100)
      .required()
  };
  handleDayChange = days => {
    this.setState({ rentalDays: days });
  };
  render() {
    const { car, handleRental } = this.props;
    const { data } = this.state;

    return (
      <div>
        <h1>{car.brand}</h1>
        <form onSubmit={this.submutHandler}>
          {this.inputBuilder("How many rental days?", "rentalDays")}
        </form>
        <button
          disabled={this.submitDisabler()}
          onClick={() => handleRental(true, data.rentalDays)}
          className="btn btn-primary m-3"
        >
          Rent
        </button>
        <button onClick={() => handleRental(false)} className="btn btn-danger">
          Cansel
        </button>
      </div>
    );
  }
}

export default NewRentals;
