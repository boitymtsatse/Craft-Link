import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
      <nav className="navbar">
        <a href="#" className="navbar-brand">
          Logo
        </a>
        <ul className="navbar-nav">
          <li>
            <Link to="/home" href="#">Home</Link>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
  );
};

export default Navbar;