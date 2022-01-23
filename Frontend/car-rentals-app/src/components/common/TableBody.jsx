import React from "react";
import pagination from "./pagination";
import { Link } from "react-router-dom";

const TableBody = ({ cars, currentPage, carsPerPage, user, handleRentBtn }) => {
  const pageCars = pagination(cars, currentPage, carsPerPage);
  return (
    <tbody>
      {pageCars.map(car => {
        return (
          <tr key={car._id}>
            <th scope="row">
              <Link to={`/cars/${car._id}`}>{car.brand}</Link>
            </th>
            <th>{car.year}</th>
            <th>{car.fuelType}</th>
            <th>{car.dailyRentalFee + "$"}</th>
            {user && (
              <th>
                <button
                  onClick={() => handleRentBtn(car)}
                  className="btn btn-info"
                >
                  Rent
                </button>
              </th>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
