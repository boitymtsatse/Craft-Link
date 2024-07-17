import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, createBrowserRouter,RouterProvider } from "react-router-dom";
import Homepage from './Components/HomePage/homePage'
import ServiceForm from './Components/Services/ServiceForm'
import Navbar from './Components/NavBar/NavBar';
import Layout from './Components/Layout';

const router = createBrowserRouter([{
  path: "/landingpage",
  element: <Landing/>,

  path:'/',
  element: <Layout/>,
  children:[
    {
      path: '/',
      element: <Homepage/>
    },
    {
path: '/services',
element: <ServiceForm/>,
    }
  ]

}]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router}/>

  </React.StrictMode>
);

