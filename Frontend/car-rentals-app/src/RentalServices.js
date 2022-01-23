import axios from "axios";
import { apiEndpoint } from "./config";
import jwtDecode from "jwt-decode";
const tokenKey = "token";

function postRental(car, rentalDays, callback) {
  const data = { carId: car._id, rentalDays: rentalDays };
  axios
    .post(`${apiEndpoint}/rental`, data, {
      headers: {
        "x-auth-token": getJWT()
      }
    })
    .then(response => {
      alert(response.data);
      callback(response);
    })
    .catch(err => {
      alert(err.response.data);
      callback(err.response);
    });
}
function getCars(callback) {
  axios.get(apiEndpoint + "/cars").then(response => {
    const data = response.data;
    callback(data);
  });
}
function getCarById(id, callback) {
  const ID = id
    .split("")
    .slice(6)
    .join("");
  axios
    .get(`${apiEndpoint}/cars/${ID}`)
    .then(response => {
      callback(response.data);
    })
    .catch(err => alert(err.response));
}
function postCars(car) {
  axios
    .post(apiEndpoint + "/cars", car, {
      headers: {
        "x-auth-token": getJWT()
      }
    })
    .then(data => console.log("Car saved to database!" + data))
    .catch(err => alert(err.response.data));
}
function registerUser(data) {
  axios
    .post(apiEndpoint + "/user/register", data)
    .then(response => {
      alert(response.data + " Please login!");
    })
    .catch(err => {
      if (err.response.data.error) {
        const serverErrors = [...err.response.data.error.details];
        alert("password" + serverErrors[0].message);
      } else {
        alert(err.response.data);
      }
    });
}

function loginUser(data) {
  axios
    .post(apiEndpoint + "/user/login", data)
    .then(response => {
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    })
    .catch(err => {
      alert(err.response.data);
    });
}

function logOut() {
  axios
    .post(
      apiEndpoint + "/user/logout",
      {},
      {
        headers: {
          "x-auth-token": getJWT()
        }
      }
    )
    .then(response => {
      alert(response.data);
      window.location = "/";
      localStorage.removeItem(tokenKey);
    })
    .catch(err => {
      console.log(err.response);
      alert(err.response.data);
      
    });
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}
function getUserRentals(callback) {
  axios
    .get(`${apiEndpoint}/user/profile`, {
      headers: {
        "x-auth-token": getJWT()
      }
    })
    .then(response => {
      callback(response.data);
    })
    .catch(err => alert(err.response.data));
}
function getJWT() {
  return localStorage.getItem(tokenKey);
}
export {
  getCars,
  postCars,
  registerUser,
  loginUser,
  logOut,
  getCurrentUser,
  getCarById,
  getUserRentals,
  getJWT,
  postRental
};
