import React, { useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from '../Users/Users'
import authService from "../../services/authService"
import FlightSearch from '../FlightSearch/FlightSearch'
import HotelSearch from '../HotelSearch/HotelSearch.jsx'
import "./App.css";

export default function App (props) {
  const [user, setUser] = useState(authService.getUser())
  // state = {
  //   user: authService.getUser(),
  // };

  const history = useHistory();

  const handleLogout = () => {
    authService.logout();
    // this.setState({ user: null });
    setUser(null);
    history.push("/");
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser());
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Route
        exact
        path="/"
        render={() => (
          <main>
            <h1>Welcome. This is an authorization template.</h1>
          </main>
        )}
      />
      <Route
        exact
        path="/signup"
        render={() => (
          <Signup
            handleSignupOrLogin={handleSignupOrLogin}
          />
        )}
      />
      <Route
        exact
        path="/login"
        render={() => (
          <Login
            handleSignupOrLogin={handleSignupOrLogin}
          />
        )}
      />
      <Route exact
      path='/users' 
      render={() =>
          user ? <Users /> : <Redirect to="/login" />
}       />
      <Route
        exact path='/flights'
        render={()=> <FlightSearch />}
      />
      <Route
        exact path='/hotels'
        render={()=> <HotelSearch />}
      />
    </>
  );
}

