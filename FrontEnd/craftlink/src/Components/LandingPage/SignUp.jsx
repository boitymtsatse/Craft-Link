// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     fname: '',
//     surname: '',
//     id_number: '',
//     dob: '',
//     phone: '',
//     email: '',
//     password: '',
//     street_name: '',
//     street_no: '',
//     suburb: '',
//     city: '',
//     province: '',
//     postal_code: '',
//   });
//   const navigate = useNavigate();

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: 'signUp',
//           id_number :  formData.id_number,
//           fname :  formData.fname,
//           surname :  formData.surname ,
//           dob :  formData.dob,
//           phone :  formData.phone ,
//           email :  formData.email ,
//           password :  formData.password ,
//           street_name :  formData.street_name ,
//           street_no :  formData.street_no ,
//           suburb :  formData.suburb ,
//           city :  formData.city ,
//           province:  formData.province,
//           postal_code :  formData.postal_code 
//         }),
//       });
//       console.log(response)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setMessage(data.status === 'success' ? 'Sign up successful!' : data.data);
//       navigate('/home');
//     } catch (error) {
//       setMessage('An error occurred: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="fname">First Name</label>
//           <input
//             type="text"
//             id="fname"
//             name="fname"
//             value={formData.fname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="surname">Surname</label>
//           <input
//             type="text"
//             id="surname"
//             name="surname"
//             value={formData.surname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="id_number">ID Number</label>
//           <input
//             type="text"
//             id="id_number"
//             name="id_number"
//             value={formData.id_number}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="dob">Date of Birth</label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="text"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="street_name">Street Name</label>
//           <input
//             type="text"
//             id="street_name"
//             name="street_name"
//             value={formData.street_name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="street_no">Street Number</label>
//           <input
//             type="text"
//             id="street_no"
//             name="street_no"
//             value={formData.street_no}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="suburb">Suburb</label>
//           <input
//             type="text"
//             id="suburb"
//             name="suburb"
//             value={formData.suburb}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="city">City</label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="province">Province</label>
//           <input
//             type="text"
//             id="province"
//             name="province"
//             value={formData.province}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="postal_code">Postal Code</label>
//           <input
//             type="text"
//             id="postal_code"
//             name="postal_code"
//             value={formData.postal_code}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormData from 'form-data'; // Import form-data

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: '',
    surname: '',
    id_number: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    street_name: '',
    street_no: '',
    suburb: '',
    city: '',
    province: '',
    postal_code: '',
  });
  const [file, setFile] = useState(null); // State to hold the selected file
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // Create a new FormData instance
    Object.keys(formData).forEach(key => formDataToSend.delete(key)); // Clear existing keys

    // Append all form fields except the file
    for (let key in formData) {
      if (key !== 'file') {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append the file
    if (file) {
      formDataToSend.append('profilePicture', file, file.name);
    }

    try {
            const response = await fetch('http://localhost:3000/api', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'signUp',
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
                postal_code :  formData.postal_code 
              }),
            });
            console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.status === 'success' ? 'Sign up successful!' : data.data);
      navigate('/home');
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_number">ID Number</label>
          <input
            type="text"
            id="id_number"
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street_name">Street Name</label>
          <input
            type="text"
            id="street_name"
            name="street_name"
            value={formData.street_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street_no">Street Number</label>
          <input
            type="text"
            id="street_no"
            name="street_no"
            value={formData.street_no}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="suburb">Suburb</label>
          <input
            type="text"
            id="suburb"
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*" // Accept only image files
            onChange={(e) => setFile(e.target.files[0])} // Update file state on change
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;







