import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
        <Link className="navbar-brand" to="/">
          📚 PlayBooks
        </Link>
        <div className="ms-auto d-flex gap-2">
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Home Content */}
      <div className="container text-center mt-5">
        <h1>Welcome to PlayBooks</h1>
        <p>Your go-to book e-commerce platform!</p>
      </div>
    </>
  );
}

export default Home;
