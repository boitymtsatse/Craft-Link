import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = ()=>{

return(
<nav className="vertical-navbar">
          <ul>
            <li><Link to="/profile">View Profile</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/service">Add a Service</Link></li>
            <li><Link to="/password">Update Password</Link></li>
            <li><Link to="/delete">Delete Account</Link></li>
          </ul>
        </nav>
)
    };
export default SideBar;
/* look */