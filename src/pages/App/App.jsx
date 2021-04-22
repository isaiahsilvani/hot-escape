import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import React, { useState, createContext } from "react";

import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from '../Users/Users'
import authService from "../../services/authService"

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
 
          <Route path="/"
            render={() => (
              
              <main>
                <div className='App'>
                <h1>Welcome to Hot Escape</h1>
                <h2>Your next vacation is waiting for you, all you've got to do is plan it.</h2>
                 <h3>Use Hot Escape to plan your next vacation. You can: </h3> 
                 <p>  1. Create an itinerary for each of your vacation plans <br/>2. Search for flights and add them to your itinerary<br/>3. Add the hotels that you're planning to stay at <br/>4. Add the attractions you plan to see <br/>5. Add in the rentals you plan to use for transportation <br/>6. Chat with others about their vacations </p> 
                <h3>Your next Escape awaits</h3>
                </div>
              </main>
              
            )}
          />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

