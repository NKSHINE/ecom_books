import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h4 className="text-white text-center py-3">📚 Menu</h4>
      <ul className="list-unstyled ps-3">
        <li className="mb-3">
          <Link to="/home" className="text-white text-decoration-none">🏠 Home</Link>
        </li>
        <li className="mb-3">
          <Link to="/cart" className="text-white text-decoration-none">🛒 Cart</Link>
        </li>
        <li className="mb-3">
          <Link to="/orders" className="text-white text-decoration-none">📦 Orders</Link>
        </li>
        <li className="mb-3">
          <Link to="/wishlist" className="text-white text-decoration-none">💖 Wishlist</Link>
        </li>
        <li className="mb-3">
          <Link to="/profile" className="text-white text-decoration-none">👤 Profile</Link>
        </li>
        <li className="mb-3">
          <Link to="/logout" className="text-white text-decoration-none">🚪 Logout</Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#343a40',
    paddingTop: '60px',
    overflowY: 'auto',
    zIndex: '1000',
  },
};

export default Sidebar;
