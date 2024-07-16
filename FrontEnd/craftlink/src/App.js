import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/HomePage/homePage';
import Hire from './components/HomePage/hirePage';
import Landing from './components/LandingPage/loginPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/hire/:id" element={<Hire/>}/>
          </Routes>
      </div>
    </Router>
  );
};

export default App
