// src/Components/Welcome/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
/// If you want to add custom styles

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to CraftLink</h1>
      <p>Your gateway to finding and offering freelance services.</p>
      <div className="welcome-buttons">
        <Link to="/signup">
          <button className="button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="button">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
