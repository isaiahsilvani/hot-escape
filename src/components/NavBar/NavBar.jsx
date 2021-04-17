import React from 'react';
import './NavBar.css'
import { NavLink } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <ul>  
        <li><NavLink to="/" onClick={handleLogout}>Home</NavLink></li>
        <li><NavLink to="/itinerary" onClick={handleLogout}>My Vacations</NavLink></li>
        <li><NavLink to="/itinerary/new" onClick={handleLogout}>New Vacation</NavLink></li>
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
