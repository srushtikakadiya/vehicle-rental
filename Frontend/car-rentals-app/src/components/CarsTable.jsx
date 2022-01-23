import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHead from "./common/TableHead";
import TableBody from "./common/TableBody";
import TableSelectFuel from "./common/TableSelect";
import Pagination from "./Pagination";
import NewRentals from "./NewRentals";
import { getCurrentUser, getCars, postRental } from "../RentalServices";

class CarsTable extends Component {
  state = {
    carsArr: "",
    carsPerPage: 4,
    currentPage: 1,
    selectFuel: "",
    carForRent: ""
  };
  componentDidMount() {
    getCars(data => {
      data = data.filter(car => {
        return car.isAvailable;
      });
      this.setState({
        carsArr: data
      });
    });
  }
  filterCars = () => {
    let filteredCars = this.state.selectFuel
      ? this.state.carsArr.filter(car => car.fuelType === this.state.selectFuel)
      : this.state.carsArr;
    filteredCars = filteredCars.filter(car => car.isAvailable);
    return filteredCars;
  };
  handleSelecetFuel = fuel => {
    this.setState({ selectFuel: fuel });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleRentBtn = car => {
    this.setState({ carForRent: car });
  };
  handleRental = (bool, rentalDays) => {
    if (bool) {
      postRental(this.state.carForRent, rentalDays, response => {
        if (response.status >= 400) {
          this.setState({ carForRent: "" });
        } else {
          const cars = [...this.state.carsArr];
          const ind = cars.indexOf(this.state.carForRent);
          cars[ind].isAvailable = false;
          this.setState({ carForRent: "", carsArr: cars });
        }
      });
    } else {
      this.setState({ carForRent: "" });
    }
  };
  render() {
    const {
      carsArr,
      selectFuel,
      carsPerPage,
      currentPage,
      carForRent
    } = this.state;
    const user = getCurrentUser();

    if (!carsArr) {
      return (
        <div>
          {user && (
            <Link to="/cars/add" className="btn btn-primary">
              Add new car
            </Link>
          )}
          <p>No cars in the databasa!</p>
        </div>
      );
    }
    const filteredCars = this.filterCars();
    if (carForRent) {
      return <NewRentals handleRental={this.handleRental} car={carForRent} />;
    }
    return (
      <div className="row m-3">
        <div className="col">
          <TableSelectFuel fuel={selectFuel} setFuel={this.handleSelecetFuel} />
        </div>
        <div className="col">
          {user && (
            <Link to="/cars/add" className="btn btn-primary">
              Add new car
            </Link>
          )}
          <table className="table">
            <TableHead />
            <TableBody
              cars={filteredCars}
              currentPage={currentPage}
              carsPerPage={carsPerPage}
              user={user}
              handleRentBtn={this.handleRentBtn}
            />
          </table>
          <Pagination
            currentPage={currentPage}
            carsPerPage={carsPerPage}
            carsCount={filteredCars.length}
            handlePageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default CarsTable;
