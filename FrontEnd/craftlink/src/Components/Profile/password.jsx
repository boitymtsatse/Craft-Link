import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "./SideBar";
import "./password.css";

const Password = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    // Validate new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New Password and Confirm New Password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        type: 'updatePassword',
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      const data = await response.json();
      alert('password updated successfully'); // Assuming the server responds with a message indicating success or failure
      navigate('/settings');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating your password.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <h2>Update Password</h2>
        <label>
          Old Password:
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
            required
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            required
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
      <SideBar/>
    </div>
  );
};

export default Password;
