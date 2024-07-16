import React, { useState } from "react";
import "./ServiceForm.css";
import axios from "axios";
import Button from "../Button";

const AddService = () => {
  const onClick =(e)=>{
    e.preventDefault()
    console.log("click")
  }

  // const url = "";
  const [data, setData] = useState({
    img:"",
    name: "",
    service: "",
    skills: "",
    exp:" ",
    description:"",
    rate:""
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <form className="container">
      <div className="header">
        <div className="text">Add Service</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input-title">Give your service a name</div>
        <div className="input">
          
          <input
            onChange={(e) => handle(e)}
            id="name"
            value={data.name}
            placeholder="name"
            type="text"
          />
        </div>
        <div className="input-title">What service do you provide?</div>
        <div className="input">
         
          <input
            onChange={(e) => handle(e)}
            id="service"
            value={data.service}
            placeholder="eg.Plumbing,Upholstery.."
            type="text"
          />
        </div>
        <div className="input-title">
          What can you do as a "insert service" ?
        </div>
        <div className="input">
          
          <input
            onChange={(e) => handle(e)}
            id="name"
            value={data.skills}
            type="text"
          />
        </div>
        <div className="input-title">How much experience do you have?</div>
        <div className="input">
         
          <input
            onChange={(e) => handle(e)}
            id="name"
            value={data.exp}
            type="password"
          />
        </div>
        <div className="input-title">
          Write a short description about your expertise ?
        </div>
        <div className="input">
          
          <input
            onChange={(e) => handle(e)}
            id="name"
            value={data.description}
            type="password"
          />
        </div>
        <div className="input-title">What is your starting rate?</div>
        <div className="input">
        
          <input
            onChange={(e) => handle(e)}
            id="name"
            value={data.rate}
            type="password"
          />
        </div>
        <div className="input-title">Upload Your Profile Picture</div>
        <div className="input">
        
          <input
            onChange={(e) => handle(e)}
            id="image"
            value={data.img}
            type="file"
          />
        </div>
      </div>
      <div className="Submit">
        <Button color="green" text="Submit" onClick={onClick}></Button>
      </div>
      
    </form>
  );
};

export default AddService;
