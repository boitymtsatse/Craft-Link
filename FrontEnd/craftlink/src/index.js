
// import { BrowserRouter, createBrowserRouter,RouterProvider } from "react-router-dom";
// import Homepage from './Components/HomePage/homePage'
// import ServiceForm from './Components/Services/ServiceForm'
// import Navbar from './Components/NavBar/NavBar';
// import Layout from './Components/Layout';
// import Profile from './Components/Profile/profile';
// import Password from './Components/Profile/password';
// import UserHistory from './Components/Profile/history';
// import Login from './Components/LandingPage/LoginPage';
// import signUp from './Components/LandingPage/SignUp';
// import Welcome from './Components/LandingPage/Welcome';



// const router = createBrowserRouter([{
//   // path: "/",
//   // element: <Welcome/>,

//   path:'/',
//   element: <Layout/>,
//   children:[
//     {
//       path: '/',
//       element: <Homepage/>
//     },
//     {
// path: '/services',
// element: <ServiceForm/>,
//     }
//   ]

// }]);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
    
    
//     <RouterProvider router={router}/>

//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path as necessary

// Render the App component into the DOM element with the id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
