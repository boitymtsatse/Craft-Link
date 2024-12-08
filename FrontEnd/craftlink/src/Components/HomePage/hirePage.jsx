import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './hirePage.css';

function HirePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null); // State to store profile data

  useEffect(() => {
    fetchProfile();
  }, [id]); // Fetch profile whenever id changes

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'getInfo', id: id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        console.log(result.data[0])
        setProfile(result.data[0]); // Assuming getInfo returns a single profile
      } else {
        console.error('Error fetching profile:', result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Unicode character for star
    }
    return stars;
  };

  if (!profile) {
    return <div>Loading...</div>; // Add a loading state if profile is not fetched yet
  }

  return (
    <div className="details">
      <h2>{profile.Service_title}</h2>
      <p>
        Name: {profile.First_Name} {profile.Last_Name}
        <br/><br/>
        Description: {profile.Service_Description}
        <br/><br/>
        Contact Details: {profile.Phone_no}
        <br/><br/>
        Rating: {renderStars(parseInt(profile.Rating))} ({profile.Rating})
        <br/><br/>
        Location: {profile.City}
        <br/><br/>
        {/* Add more profile details as needed */}
      </p>
    </div>
  );
}

export default HirePage;
