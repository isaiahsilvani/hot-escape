import React from 'react';
import './NavBar.css'
import logo from '../../img/spicy-wings.png'
import { NavLink } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/"><img src={logo} className="logo" /></NavLink></li>
        <li><NavLink to="/itinerary">My Vacations</NavLink></li>
        <li><NavLink to="/itinerary/new">New Vacation</NavLink></li>
      </ul>
      {user ?
        <ul className="nav-login">
          <li><NavLink to="" onClick={handleLogout}>Logout</NavLink></li>
        </ul>
      :
        <ul className="nav-login">
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar;
