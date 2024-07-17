
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/NavBar/NavBar';
import Home from './Components/HomePage/homePage';
import Hire from './Components/HomePage/hirePage';
// import Landing from './components/LandingPage/LoginPage.jsx';
import Settings from './Components/Profile/settings';
import Profile from './Components/Profile/profile';
import Password from './Components/Profile/password';
import UserHistory from './Components/Profile/history';
import Login from './Components/LandingPage/LoginPage';
import SignUp from './Components/LandingPage/SignUp'; // Ensure this matches the file name and export
import Welcome from './Components/LandingPage/Welcome';
import Homepage from './Components/HomePage/homePage';

// New component for conditional rendering of Navbar
const ConditionalNavbar = () => {
  const location = useLocation();

  if (!location.pathname.startsWith('/login') && !location.pathname.startsWith('/signup') && location.pathname !== '/') {
    return <Navbar />;
  }
  return null;
};

const App = () => {
  return (
    <Router>
      <div>
        <ConditionalNavbar /> {/* Render ConditionalNavbar here */}
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/password" element={<Password />}/>
          <Route path="/history" element={<UserHistory />}/>
          <Route path="/signup" element={<SignUp />}/> {/* Corrected component name */}
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Welcome />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/hire/:id" element={<Hire/>}/>
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
