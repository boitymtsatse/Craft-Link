import React from 'react';
import './hirePage.css';

function HirePage() {
  const homeRedirect = () => {
    window.location.href = './hirePage.html'; // Adjust this path according to your routing setup
  };

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
        <button className="hire" onClick={homeRedirect}>HIRE</button>
      </p>
    </div>
  );
}

export default HirePage;
