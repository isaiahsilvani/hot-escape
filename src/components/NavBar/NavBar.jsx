import React from 'react';
import { NavLink } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <ul>
      {user ?
        <>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
        </>
      :
        <>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </>
      }
      </ul>
    </nav>
  )
}

export default NavBar;
