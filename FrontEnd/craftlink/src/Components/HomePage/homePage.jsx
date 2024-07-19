import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [showResult, setShowResult] = useState(''); // State variable for showResult

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'getProfiles' }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        console.log(result.data);
        setProfiles(result.data);
        setShowResult('');
      } else {
        console.error('Error fetching profiles:', result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNearbyServices = async () => {
    if (cityQuery === '') {
      fetchProfiles();
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'getNearby', location: cityQuery }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setShowResult(`Showing result for ${cityQuery}`);
        setProfiles(result.data);
      } else {
        console.error('Error fetching nearby services:', result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const searchServices = async () => {
    if (searchQuery === '') {
      fetchProfiles();
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'searchBar', search: searchQuery }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setShowResult(`Showing result for ${searchQuery}`);
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
    <div className="homeBody">
      <div className="Logo">
        <img src="https://cdn.discordapp.com/attachments/1254932815963881514/1263469742019051550/image.png?ex=669a5964&is=669907e4&hm=1c9c4778b660632320000f1fae1d237725e6b173c5dda3b92aff378e343d9cc9&" alt="Logo" />
        <p>A platform for freelancers and semi-skilled labours to unleash their potential </p>
      </div>
      <br /><br />
      <div className="searches">
        <div className='searchDiv'>
          <input
            id="searchBar"
            placeholder="Search for services anywhere"
            className="searchBar"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value === '') {
                fetchProfiles();
              } else {
                searchServices();
              }
            }}
          />
        </div>
        <div>
          <input
            id="cityInput"
            placeholder="Enter your city to find people near you!"
            className="cityInput"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              if (e.target.value === '') {
                fetchProfiles();
              } else {
                fetchNearbyServices();
              }
            }}
          />
        </div>
      </div>
      <br /><br /><br />
      <div className="resultsBar">
        <h2>{showResult}</h2> {/* Display showResult */}
      </div>
      <div className="profDiv">
        {profiles.map((profile, index) => (
          <div key={index} className="profiles">
            <img src={profile.Profile_Pic} className="profilePic" alt="Profile" />
            <div className="homeDetails">
              <h2>{profile.Service_title}</h2>
              <p>
                Name: {profile.First_Name} {profile.Last_Name}
                <br /><br />Service: {profile.Service_Description}
                {profile.rate && <><br /><br />Rate per hour: {profile.rate}</>}
                {profile.contact && <><br /><br />Contact: {profile.contact}</>}
                {profile.experience && <><br /><br />Experience: {profile.experience}</>}
                <br /><br />Rate: R{profile.Rate_per_hour}/h
                <br /><br />Rating: {renderStars(parseInt(profile.Rating))} ({profile.Rating})
                <br />
                <button onClick={() => handleHire(profile.User_ID)} className="hire">
                  HIRE
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
      <footer>
        CraftLink@2024
      </footer>
    </div>
  );
}

export default App;
