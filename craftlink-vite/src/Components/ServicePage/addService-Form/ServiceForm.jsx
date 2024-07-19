import React, { useState } from "react";
import "./ServiceForm.css";
import axios from "axios";
import Button from "./Button.jsx";

const AddService = () => {
  const [data, setData] = useState({
    
    name: "",
    service: "",
    skills: "",
    exp: "",
    description: "",
    rate: "",
    picture: "",
    
  });

  function handle(e) {
    const newData = { ...data };
    const { id, value, files } = e.target;
    
    if (id === 'img') {
      newData[id] = files[0]; // Handle file input separately
    } else {
      newData[id] = value;
    }

    setData(newData);
    console.log(newData); // This will log the updated data each time a field changes
  }

  const onClick = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/service/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response",response.data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

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
            id="skills"
            value={data.skills}
            type="text"
          />
        </div>
        <div className="input-title">How much experience do you have?</div>
        <div className="input">
          <input
            onChange={(e) => handle(e)}
            id="exp"
            value={data.exp}
            type="text"
          />
        </div>
        <div className="input-title">
          Write a short description about your expertise ?
        </div>
        <div className="input">
          <input
            onChange={(e) => handle(e)}
            id="description"
            value={data.description}
            type="text"
          />
        </div>
        <div className="input-title">What is your starting rate?</div>
        <div className="input">
          <input
            onChange={(e) => handle(e)}
            id="rate"
            value={data.rate}
            type="text"
          />
        </div>
        <div className="input-title">Upload Your Profile Picture</div>
        <div className="input">
          <input
            onChange={(e) => handle(e)}
            id="picture"
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
