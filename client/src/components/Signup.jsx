import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css'; // Reuse same styles

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/auth/register", {
      full_name: name,
      email,
      password
    }, { withCredentials: true })
      .then(res => {
        if (res.data.message === "Signup successful") {
          navigate("/home");
        }
      })
      .catch(err => {
        alert(err.response?.data?.message || "Server error");
      });
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><strong>Name</strong></label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label><strong>Password</strong></label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div><br></br>
          <button type="submit" className="btn btn-success w-100 mb-2">Sign Up</button>
          
        </form>

        <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-3">
          <i className="bi bi-google"></i> Login with Google
        </button>

        <p className="text-center">Already have an account?</p>
        <Link to="/login" className="btn btn-outline-primary w-100">Login</Link>
      </div>
    </div>
  );
}

export default Signup;