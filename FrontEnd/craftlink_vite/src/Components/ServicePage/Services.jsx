import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Assuming you are using MUI for the Button component

const ExampleComponent = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/my-ana'); // Replace '/desired-path' with your actual path
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClick}>
        Your Analytics
      </Button>
    </div>
  );
};

export default ExampleComponent;