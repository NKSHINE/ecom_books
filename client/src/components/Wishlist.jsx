import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Wishlist.css"; // make sure to create this file

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Fetch wishlist only if user is logged in
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/api/wishlist", { withCredentials: true })
        .then((res) => setWishlist(res.data))
        .catch((err) => console.error("Failed to fetch wishlist:", err));
    }
  }, [user]);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:5000/api/wishlist/${id}`, { withCredentials: true })
      .then(() => {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      })
      .catch(() => alert("Failed to remove from wishlist"));
  };

  return (
    <div className="d-flex">
      <Sidebar user={user} />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Your Wishlist</h2>

        {!user ? (
          <p className="text-center">
            Please <a href="/login">login</a> to view your wishlist.
          </p>
        ) : wishlist.length === 0 ? (
          <p className="text-center">No items in wishlist.</p>
        ) : (
          <div className="wishlist-wrapper mx-auto">
            <div className="row">
              {wishlist.map((item) => (
                <div key={item._id} className="col-md-3 col-sm-6 mb-4">
  <div className="book-card">
    <img
      src={item.book_id?.image}
      className="book-img"
      alt={item.book_id?.title}
    />
    <h5>{item.book_id?.title}</h5>
    <div className="book-meta d-flex justify-content-between align-items-center">
      <span>{item.book_id?.author}</span>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => handleRemove(item._id)}
      >
        Remove
      </button>
    </div>
  </div>
</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;