import React, { Component } from "react";
import { getUserRentals } from "../RentalServices";
class UserProfile extends Component {
  state = { rentals: [] };
  componentDidMount() {
    getUserRentals(data => {
      this.setState({ rentals: data });
    });
  }
  showRental = () => {};
  render() {
    const { rentals } = this.state;
    
    if (!rentals.length) return (<p>No rentals!</p>);
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date Out</th>
              <th scope="col">Rental days</th>
              <th scope="col">Fee</th>
              <th scope="col">is paid</th>
              <th scope="col">Renter name</th>
              <th scope="col">Rented car</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map(r => {
              return (
                <tr key={r._id}>
                  <th>{r.dateOut}</th>
                  <th>{r.rentalDays}</th>
                  <th>{r.rentalFee}$</th>
                  <th>{r.isPaid ? "True" : "Not paid!"}</th>
                  <th>{r.renter.name}</th>
                  <th>{r.rentedCar.brand}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserProfile;
