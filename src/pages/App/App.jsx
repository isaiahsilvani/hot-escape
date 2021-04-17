import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import React, { useState, createContext } from "react";

import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from '../Users/Users'
import authService from "../../services/authService"
import FlightSearch from '../FlightSearch/FlightSearch'
import HotelSearch from '../HotelSearch/HotelSearch.jsx'
import AttractionSearch from '../AttractionSearch/AttractionSearch'
import "./App.css";
import CreateItinerary from "../Itinerary/CreateItinerary/CreateItinerary";
import ItineraryList from '../Itinerary/ItineraryList/ItineraryList';
import ItineraryView from '../Itinerary/ItineraryView/ItineraryView';
import { UserContext } from '../../components/UserContext'
import ProtectedRoute from '../../components/ProtectedRoute'

export default function App (props) {
  const [user, setUser] = useState(authService.getUser())
  // state = {
  //   user: authService.getUser(),
  // };

  const history = useHistory();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    history.push("/");
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser());
  }


  return (
    <>
      <UserContext.Provider value={user}>
        <NavBar user={user} handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/signup"
            render={() => (
              <Signup handleSignupOrLogin={handleSignupOrLogin} />
            )}
          />
          <Route path="/login"
            render={() => (
              <Login handleSignupOrLogin={handleSignupOrLogin} />
            )}
          />
          <Route path='/users' 
          render={() =>
              user ? <Users /> : <Redirect to="/login" /> }       
          />
          <Route path='/flights'
            render={()=> <FlightSearch />}
          />
          <Route path='/itinerary/new'
            render={()=> <CreateItinerary user={user} />}
          />

          <ProtectedRoute path='/itinerary'>
            <ItineraryList />
          </ProtectedRoute>
 
          <Route path='/itinerary/:id'
            render={()=> <ItineraryView />}
          />
          <Route path='/hotels'
            render={()=> <HotelSearch />}
          />
          <Route path='/attractions'
            render={()=> <AttractionSearch />}
          />
          <Route exact path="/"
            render={() => (
              <main>
                <h1>Welcome. This is an authorization template.</h1>
              </main>
            )}
          />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

