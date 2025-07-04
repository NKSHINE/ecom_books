import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import Sidebar3 from "./sidebar3"; // ✅ Import Sidebar3

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.message === "Login successful") {
          navigate("/home");
        }
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || "Server error");
      });
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  return (
    <>
      <Sidebar3 /> {/* ✅ Sidebar3 at the top */}
<br></br>
      <div className="login-container">
        <div className="login-card">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
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
              /><br />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-2">Login</button>
          </form>

          <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-3">
            <i className="bi bi-google"></i> Login with Google
          </button>

          <p className="text-center">Don't have an account?</p>
          <Link to="/register" className="btn btn-outline-primary w-100">Sign Up</Link>
        </div>
      </div>
    </>
  );
}

export default Login;