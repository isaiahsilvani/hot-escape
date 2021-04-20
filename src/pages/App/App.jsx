import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import React, { useState, createContext } from "react";

import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from '../Users/Users'
import authService from "../../services/authService"
import FlightSearch from '../Flights/FlightSearch/FlightSearch'
import HotelSearch from '../../pages/Hotels/HotelSearch/HotelSearch'
import AttractionSearch from '../../pages/Attractions/AttractionSearch/AttractionSearch'

import Join from '../../components/Join/Join'
import Chatroom from '../Chatroom/Chatroom'

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
          <Route exact path="/login"
            render={() => (
              <Login handleSignupOrLogin={handleSignupOrLogin} />
            )}
          />

          <ProtectedRoute exact path='/join'>
            <Join />
          </ProtectedRoute>

          <ProtectedRoute exact path='/chatroom'>
            <Chatroom />
          </ProtectedRoute>

          <ProtectedRoute path='/itinerary/new'>
            <CreateItinerary />
          </ProtectedRoute>
          
          <ProtectedRoute path='/itinerary/:id'>
            <ItineraryView />
          </ProtectedRoute>

          <ProtectedRoute path='/itinerary'>
            <ItineraryList />
          </ProtectedRoute>
 
          
          

          <Route path='/flights'
            render={()=> <FlightSearch />}
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
                <h1>Welcome to Hot Escape.</h1>
                <h4>Your next vacation is waiting for you, all you've got to do it plan it.</h4>
                <p> Use Hot Escape to plan your next vacation. You can create an itinerary for each of your vacation plans. You fill your itinerary with the flights that you search for and add in your hotels and attractions.  You can also use Hot Escape to chat with other travelers about their vacations. </p> <br/>
                <h2>Safe Travels!</h2>
              </main>
            )}
          />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

