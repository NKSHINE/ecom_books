import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Sidebar2({ user }) {
  return (
    <div className="top-navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">PlayBooks</Link>
        
      </div>

      <ul className="navbar-links">
        {user && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar2;