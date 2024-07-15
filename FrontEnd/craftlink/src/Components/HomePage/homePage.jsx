import React, { useState, useEffect } from 'react';
import './homePage.css';
import HirePage from './hirePage'; 


function App() {
  const [locationStatus, setLocationStatus] = useState('Fetching location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState([
    {
      type: 'Plumbing',
      name: 'Rethabile Bore',
      description: 'Exceptional plumbing services',
      rate: 'R50',
      rating: '★★ (9)',
      contact: null,
      experience: null,
    },
    {
      type: 'Gardening',
      name: 'Boitumelo Mtsatse',
      contact: '077 853 6785',
      experience: '5 years',
      rating: '★★★★ (40)',
      description: null,
      rate: null,
    },
    {
      type: 'Roofing',
      name: 'Paballo Diyase',
      contact: '077 853 6785',
      experience: '10 years',
      rating: '★★★ (12)',
      description: null,
      rate: null,
    },
  ]);

  const homeRedirect = () => {
    <HirePage/>
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setLocationStatus('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocationStatus(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setLocationStatus('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setLocationStatus('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setLocationStatus('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        setLocationStatus('An unknown error occurred.');
        break;
      default:
        setLocationStatus('An unknown error occurred.');
    }
  };

  const filterProfiles = () => {
    return profiles.filter(profile => {
      const details = `${profile.type} ${profile.name} ${profile.description || ''} ${profile.rate || ''} ${profile.contact || ''} ${profile.experience || ''} ${profile.rating}`.toLowerCase();
      return details.includes(searchQuery.toLowerCase());
    });
  };

  return (
    <div>
      <input
        id="searchBar"
        placeholder="Search here..."
        className="searchBar"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={getLocation}>Find Services Near Me</button>
      <div className="resultsBar">
        <h2>Results for "Near me..."</h2>
        <p id="location-status">{locationStatus}</p>
      </div>
      {filterProfiles().map((profile, index) => (
        <div key={index} className="profiles">
          <img src="profilePic.jpg" className="profilePic" alt="Profile" />
          <div className="details">
            <h2>{profile.type}</h2>
            <p>
              Name: {profile.name}
              {profile.description && <><br /><br />Description: {profile.description}</>}
              {profile.rate && <><br /><br />Rate per hour: {profile.rate}</>}
              {profile.contact && <><br /><br />Contact: {profile.contact}</>}
              {profile.experience && <><br /><br />Experience: {profile.experience}</>}
              <br /><br />Rating: {profile.rating}
              {profile.type === 'Plumbing' && <button className="hire" onClick={homeRedirect}>HIRE</button>}
            </p>
          </div>
        </div>
      ))}
      <footer></footer>
    </div>
  );
}

export default App;
