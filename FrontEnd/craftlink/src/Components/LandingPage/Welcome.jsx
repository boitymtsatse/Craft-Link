// src/Components/Welcome/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
  return (
    <div className="welcome">
      <img src="https://cdn.discordapp.com/attachments/1254932815963881514/1263469742019051550/image.png?ex=669a5964&is=669907e4&hm=1c9c4778b660632320000f1fae1d237725e6b173c5dda3b92aff378e343d9cc9&"></img>
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
