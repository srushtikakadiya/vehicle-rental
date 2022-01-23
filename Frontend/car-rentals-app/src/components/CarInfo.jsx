import React, { Component } from "react";
import { getCarById } from "../RentalServices";
class CarInfo extends Component {
  state = { car: "" };
  componentDidMount() {
    getCarById(this.props.location.pathname, car => {
      this.setState({ car });
    });
  }
  displayCar = () => {
    let car = [];
    for (let key in this.state.car) {
      car.push(<p key={key}>{`${key}: ${this.state.car[key]}`}</p>);
    }
    return car;
  };
  render() {
    if (!this.state.car) return <h1>There is no car!</h1>;
    return <div>{this.displayCar()}</div>;
  }
}

export default CarInfo;
