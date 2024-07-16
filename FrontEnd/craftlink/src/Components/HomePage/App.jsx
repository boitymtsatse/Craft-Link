// App.jsx

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'; // Global styles if any
import HomePage from './homePage'; // Importing your homepage component
import HirePage from './hirePage';


function App() {
  // Your existing code
  return (
      <div className="App">
        {/* Other components or elements */}
        <HomePage/>
        {/* Other components or elements */}
      </div>
  );
}

export default App;
