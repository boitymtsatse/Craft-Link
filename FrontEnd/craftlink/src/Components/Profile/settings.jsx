import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from "./profile"
import './settings.css';

const Settings = () => {
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);

  const openDeleteConfirmationModel = () => {
    setIsDeleteModelOpen(true);
  };

  const navigate = useNavigate();
  const closeDeleteConfirmationModel = () => {
    setIsDeleteModelOpen(false);
  };

  const deleteUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'deleteUser', // Specify the type of request
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      navigate('/');
      // Handle success here, e.g., show a success message or redirect the user
    } catch (error) {
      console.error('There was a problem deleting the account:', error);
      // Handle errors here, e.g., show an error message
    }
  };

  return (
    <div className="settingsBody">
      <div className="main-content">
        <nav className="vertical-navbar">
          <ul>
            <li><Link to="/profile">View Profile</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/service">Add a Service</Link></li>
            <li><Link to="/password">Update Password</Link></li>
            <li>
              <a href="#deleteAccount" onClick={(e) => { e.preventDefault(); document.getElementById('deleteAccountSection').scrollIntoView({ behavior: 'smooth' }); }}>Delete Account</a>
            </li>
          </ul>
        </nav>
        <Profile/>

        {/* <div className="content">
          <h1>User Settings</h1>
          <section>
            <h2>Account Information</h2>
            <Link to="/profile" className="button">View Profile</Link>
          </section>
          <section>
            <h2>History</h2>
            <Link to="/history" className="button">History</Link>
          </section>
          <section>
            <h2>Add a Service</h2>
            <button className="button" onClick={() => window.location.href = 'service.html'}>Add a Service</button>
          </section>
          <section>
            <h2>Update Password</h2>
            <Link to="/password" className="button">Update Password</Link>
          </section>
          <section id="deleteAccountSection">
            <h2>Delete Account</h2>
            <p>Delete your account permanently.</p>
            <button className="button" onClick={openDeleteConfirmationModel}>Delete Account</button> */}

            {isDeleteModelOpen && (
              <div id="deleteConfirmationModel" className="model">
                <div className="model-content">
                  <h2>Are you sure you want to delete your account?</h2>
                  <button id="confirmDeleteButton" className="button" onClick={deleteUser}>Yes</button>
                  <button className="button" onClick={closeDeleteConfirmationModel}>Cancel</button>
                </div>
              </div>
            )}
          {/* </section> */}
        </div>
      </div>
    // </div>
  );
};

export default Settings;
