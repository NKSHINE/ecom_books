
//App.jsx
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Wishlist from "./components/Wishlist";
import AdminDashboard from "./components/AdminDashboard";
import BookDetail from './components/BookDetail.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Order user={user} />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/Wishlist" element={<Wishlist user={user} />}/>
      

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
