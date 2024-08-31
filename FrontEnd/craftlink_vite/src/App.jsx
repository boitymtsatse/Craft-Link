
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
// import React from 'react';
// import Navbar from './Components/NavBar/NavBar';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
      
//     </div>
//   );
// };

// export default App;


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
import SignUp from './Components/LandingPage/Signup.jsx'; 
import Welcome from './Components/LandingPage/Welcome';
import Homepage from './Components/HomePage/homePage.jsx';
import SideBar from './Components/Profile/SideBar.jsx';
import Delete from './Components/Profile/delete';
import Chat from './Components/Chatbot/chatApp';
import Services from './Components/ServicePage/Services.jsx';
import ServiceForm from './Components/Services/ServiceForm';
import Ana from './Components/ServicePage/AnaService.jsx';

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
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Welcome />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/hire/:id" element={<Hire/>}/>
          <Route path="/delete" element={<Delete/>}/>
          <Route path="/chat" element={<Chat />} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/MyService" element={<Services/>}/>
          <Route path="/add-service" element={<ServiceForm/>}/>
          <Route path="/my-ana" element={<Ana/>}/>
          {}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
/* look */