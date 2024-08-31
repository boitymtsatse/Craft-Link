// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <a href="#" className="navbar-brand">
//         Logo
//       </a>
//       <ul className="navbar-nav">
//         <li>
//         <Link to="/home">Home</Link>
//         </li>
//         <li>
//           <a href="#">My Services</a>
//         </li>
//         <li>
//         <Link to="/settings">Settings</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const Navbar = ({ logout }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'logout'
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">
        CraftLink
      </a>
      <ul className="navbar-nav">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <a href="/services">My Services</a>
        </li>
        <li>
          <Link to="/profile">Settings</Link>
        </li>
        <li>
        <span onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </span> 
      </li>

      </ul>
    </nav>
  );
};

export default Navbar;
