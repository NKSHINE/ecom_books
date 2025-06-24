import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Sidebar({ user }) {
  return (
    <div className="top-navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">PlayBooks</Link>
        <input type="text" className="search-bar" placeholder="Search books..." />
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/admin">
            <img src="/icons/cart.png" alt="Admin" className="nav-icon white-icon" />Admin
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <img src="/icons/cart.png" alt="Cart" className="nav-icon white-icon" />Cart
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="/icons/booking.png" alt="Orders" className="nav-icon white-icon" />Orders
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <img src="/icons/heart.png" alt="Wishlist" className="nav-icon white-icon" />Wishlist
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile">
                <img src="/icons/user.png" alt="Profile" className="nav-icon white-icon" />Profile
              </Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;