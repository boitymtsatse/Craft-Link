import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./Components/HomePage/homePage";
import ServiceForm from "./Components/Services/ServiceForm";
import Navbar from "./Components/NavBar/NavBar";
import Layout from "./Components/Layout";


   
  

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
