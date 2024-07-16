import React from 'react';
import './NavBar.css';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav className="navbar">
      <Link to href="#" className="navbar-brand">
        Logo
      </Link>
      <ul className="navbar-nav">
        <li>
          <Link to href="/">Home</Link>
        </li>
        <li>
          <Link to ="/services">Services</Link>
        </li>
        <li>
          <Link to href="#"></Link>
        </li>
      </ul>
    </nav>
    
    </>
  )
};

export default Navbar;