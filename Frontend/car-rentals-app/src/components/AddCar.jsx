import React, { } from "react";
import Form from "./Form";
import Joi from "joi-browser";
import {postCars} from '../RentalServices';

class AddCar extends Form {
  state = {
    data: {
      brand: "",
      year: "",
      fuelType: "",
      dailyRentalFee: null
    },
    error: {}
  };
  schema = {
    brand: Joi.string()
      .min(3)
      .max(50)
      .required(),
    year: Joi.number()
      .min(1920)
      .max(2020)
      .required(),
    fuelType: Joi.string()
      .valid("benzin", "lpg", "metan", "diesel")
      .required(),
    dailyRentalFee: Joi.number()
      .min(1)
      .required()
  };

  submutHandler = e => {
    e.preventDefault();
    postCars(this.state.data);
    window.location = '/cars';
  };
  render() {
    return (
      <div>
        <h1>Add car</h1>
        <form onSubmit={this.submutHandler}>
          {this.inputBuilder("Brand", "brand")}
          {this.inputBuilder("Year", "year")}
          {this.inputBuilder("Fuel type", "fuelType")}
          {this.inputBuilder("Daily rental Fee", "dailyRentalFee")}
          <button disabled={this.submitDisabler()} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default AddCar;
