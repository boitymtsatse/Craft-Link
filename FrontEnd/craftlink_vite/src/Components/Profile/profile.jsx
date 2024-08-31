import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { Buffer } from 'buffer';

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
    profilePic: '',
  });
  const [file, setFile] = useState(null);


  useEffect(() => {
    function byteArrayToBase64(byteArray) {
      
      const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let base64String = '';
      for (let i = 0; i < byteArray.length; i++) {
        base64String += String.fromCharCode(byteArray[i]);
      }
      return base64String;
    }
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
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //const base64ImageString = Buffer.from(data.data.Profile_Pic).toString('base64');
        const base = Buffer.from(data.data.Profile_Pic);
        const base6 = byteArrayToBase64(base)
     
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
            profilePic:  base6,
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
    const base64String = await encodeFileToBase64(file);

    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'updateUser',
          id_number :  formData.id_number,
                fname :  formData.fname,
                surname :  formData.surname ,
                dob :  formData.dob,
                phone :  formData.phone ,
                email :  formData.email ,
                password :  formData.password ,
                street_name :  formData.street_name ,
                street_no :  formData.street_no ,
                suburb :  formData.suburb ,
                city :  formData.city ,
                province:  formData.province,
                postal_code :  formData.postal_code,
                pp: base64String,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert("Details updated successfully")
      window.location.reload();
      console.log(data); // Handle success response here, e.g., show a success message
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }

  };
  
  function encodeFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  return (
    <div >
      <form className="SForm" onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Update User Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '30vh' }}>
      <img src={formData.profilePic} alt="Profile" style={{ width: '300px', height: '300px', marginBottom: '20px' }} />
  
    </div>
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
        <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*" // Accept only image files
            onChange={(e) => setFile(e.target.files[0])} // Update file state on change
          />
        <button type="submit">Update</button>

      </form>
      <SideBar/>
    </div>
  );
};

export default UserInfoPage;
/* look */