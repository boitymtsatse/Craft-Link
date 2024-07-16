import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './hirePage.css';

function HirePage() {
  return (
    <div className="details">
      <h2>Plumbing</h2>
      <p>
        Name: Rethabile Bore
        <br />
        Description: Exceptional plumbing services
        <br />
        Rate per hour: R50
        <br />
        Rating: &#9733;&#9733; (9)
        <br />
      </p>
    </div>
  );
}

export default HirePage;
