import React, {useContext} from 'react';
import './NavBar.css'
import logo from '../../img/spicy-wings.png'
import { Link } from "react-router-dom";
import { UserContext } from '../../components/UserContext'

const NavBar = ({ handleLogout }) => {
  const user = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li><Link to="/"><img src={logo} className="logo" /></Link></li>
        <li><Link to="/itinerary">My Escapes</Link></li>
        <li><Link to="/itinerary/new">New Escape</Link></li>
        <li><Link to="/join">Chatroom</Link></li>
      </ul>
      {user ?
        <ul className="nav-login">
          <li><Link to="" onClick={handleLogout}>Logout</Link></li>
        </ul>
      :
        <ul className="nav-login">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar;
