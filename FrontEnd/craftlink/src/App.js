import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Components/NavBar/NavBar';
import Home from './Components/HomePage/App';
import Hire from './Components/HomePage/hirePage';
import Landing from './Components/LandingPage/loginPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <HomePage /> */}
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/hire" element={<Hire/>}/>
          </Routes>
      </div>
    </Router>
  );
};

export default App
