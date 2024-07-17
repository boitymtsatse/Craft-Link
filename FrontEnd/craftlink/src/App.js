
// import React from 'react';
// import Navbar from './Components/NavBar/NavBar';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
      
//     </div>
    
//   );
// };

// export default App
//////////////////////////////////////

// src/App.js
import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/NavBar';
import Location from './Components/ServicePage/Location';
import ServiceList from './Components/ServicePage/ServiceList';

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <header>
                <h1>Service Provider</h1>
                <nav>
                    <ul>
                        <li><a href="#location">Location</a></li>
                        <li><a href="#services">Services</a></li>
                    </ul>
                </nav>
            </header>
            <Location />
            <ServiceList />
        </div>
    );
};

export default App;
