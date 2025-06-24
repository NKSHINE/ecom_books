import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Sidebar3() {
  return (
    <div className="top-navbar">
        
      <div className="navbar-left">
        <Link to="/home" className="logo">PlayBooks</Link>
      </div>

      <ul className="navbar-links">
        {/* No links here */}
      </ul>
    </div>
  );
}

export default Sidebar3;