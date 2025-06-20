import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function Login({ setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true })
    .then(res => {
      if (res.data.message === "Login successful") {
        setUser(res.data.user);
        navigate("/home");
      }
    })
    .catch(err => {
      console.error(err); // Add this
      alert(err.response?.data?.message || "Server error");
});

};



  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary min-vh-100">
      <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>

       

        <p className="mt-3 text-center">Don't have an account?</p>
        <Link to="/register" className="btn btn-outline-primary w-100">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
