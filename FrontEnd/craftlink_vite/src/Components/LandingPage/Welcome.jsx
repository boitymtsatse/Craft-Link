// src/Components/Welcome/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
  return (
    <div className="welcome">
      <img src="https://cdn.discordapp.com/attachments/1254932815963881514/1263469742019051550/image.png?ex=66c094e4&is=66bf4364&hm=77f6c6f6c333078d6586cd842592da76ab2d6285ddf9dfd8276fb5e0b3720241&"></img>
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
