import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Profile from "./profile"
// import './settings.css';
import SideBar from "./SideBar";
import "./delete.css"

const Delete = () => {
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
            <div className="content">
               <section id="deleteAccountSection">
                 <h2>Delete Account</h2>
                <p>Delete your account permanently.</p>
                <button className="button" onClick={openDeleteConfirmationModel}>Delete Account</button>
    
                {isDeleteModelOpen && (
                  <div id="deleteConfirmationModel" className="model">
                    <div className="model-content">
                      <h2>Are you sure you want to delete your account?</h2>
                      <button id="confirmDeleteButton" className="button" onClick={deleteUser}>Yes</button>
                      <button className="button" onClick={closeDeleteConfirmationModel}>Cancel</button>
                    </div>
                  </div>
                )}
              </section>
              <SideBar/>
            </div>
        // </div>
      );
    };
    
    export default Delete;
    