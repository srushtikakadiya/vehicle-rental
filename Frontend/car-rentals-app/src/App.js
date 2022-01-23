import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import CarsTable from "./components/CarsTable";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import AddCar from "./components/AddCar";
import CarInfo from "./components/CarInfo";
import UserProfile from "./components/UserProfile";
import NewRentals from "./components/NewRentals";
import { getCurrentUser } from "./RentalServices";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route exact path="/cars/add" component={AddCar} />
            <Route path="/cars/:id" component={CarInfo} />
            <Route path="/newrentals" component={NewRentals} />
            <Route path="/cars" component={CarsTable} />
            <Route path='/profile' component={UserProfile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/notfound" component={NotFound} />
            <Redirect exact from="/" to="/cars" />
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
