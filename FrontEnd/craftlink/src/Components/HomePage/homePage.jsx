import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {fetchProfiles();}, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'getProfiles'}),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setProfiles(result.data);
      } else {
        console.error('Error fetching profiles:', result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  let showResult = '';

  const fetchNearbyServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'getNearby', location: cityQuery}),
      });
      const result = await response.json();
      if (result.status === 'success') {
        showResult = `Showing result for ${cityQuery}`;
        setProfiles(result.data);
      } else {
        console.error('Error fetching nearby services:', result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const searchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'searchBar', search: searchQuery}),
      });
      const result = await response.json();
      if (result.status === 'success') {
        showResult = `Showing result for ${searchQuery}`;
        setProfiles(result.data);
      } else {
        console.error('Error searching:', result.data);
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

  const navigate = useNavigate();
  const handleHire = (profileId) => {
    navigate(`/hire/${profileId}`);
  };

  return (
    <div>
      <br/><br/>
      <div className='searchDiv' onChange={searchServices}>
        <input
          id="searchBar"
          placeholder="Search services..."
          className="searchBar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br/> Enter your city to find people near you!
      <div onChange={fetchNearbyServices}>
        <input
          id="cityInput"
          placeholder="Enter city..."
          className="cityInput"
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
        />
      </div>
      <div className="resultsBar">
        <h2>{showResult}</h2>
      </div>
      <div className="profDiv">
        {profiles.map((profile, index) => (
          <div key={index} className="profiles">
            <img src={profile.Profile_Pic} className="profilePic" alt="Profile" />
            <div className="details">
              <h2>{profile.Service_title}</h2>
              <p>
                Name: {profile.First_Name} {profile.Last_Name}
                <br /><br />Service: {profile.Service_Description}
                {profile.rate && <><br /><br />Rate per hour: {profile.rate}</>}
                {profile.contact && <><br /><br />Contact: {profile.contact}</>}
                {profile.experience && <><br /><br />Experience: {profile.experience}</>}
                <br/><br/>Rating: {renderStars(parseInt(profile.Rating))} ({profile.Rating})
                <br/><br/>
                <button onClick={() => handleHire(profile.User_ID)} className="hire">
                  HIRE
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
