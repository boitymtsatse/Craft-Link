import React, { useEffect, useState } from 'react';
import './profile.css';
import SideBar from "./SideBar";


const UserInfoPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    street_name: '',
    street_no: '',
    suburb: '',
    city: '',
    province: '',
    postal_code: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'getUser', // Specify the type of request

          }),
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status === "success") {
          setFormData({
            phone: data.data.Phone_no,
            email: data.data.Email,
            street_name: data.data.Street_name,
            street_no: data.data.Street_no,
            suburb: data.data.Suburb,
            city: data.data.City,
            province: data.data.Province,
            postal_code: data.data.Postal_code,
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchData();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'update',
          ...formData,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Handle success response here, e.g., show a success message
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div >
      <form className="SForm" onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Update User Information</h2>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label>
          Street Name:
          <input
            type="text"
            name="street_name"
            value={formData.street_name}
            onChange={handleChange}
            placeholder="Street Name"
          />
        </label>
        <label>
          Street No.:
          <input
            type="text"
            name="street_no"
            value={formData.street_no}
            onChange={handleChange}
            placeholder="Street No."
          />
        </label>
        <label>
          Suburb:
          <input
            type="text"
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            placeholder="Suburb"
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </label>
        <label>
          Province:
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Province"
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Postal Code"
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <SideBar/>
    </div>
  );
};

export default UserInfoPage;
