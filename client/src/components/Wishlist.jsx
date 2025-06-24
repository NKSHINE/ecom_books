import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

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
      <div className="container mt-4" style={{ marginLeft: "220px" }}>
        <h2 className="mb-4">💖 Your Wishlist</h2>

        {!user ? (
          <p>Please <a href="/login">login</a> to view your wishlist.</p>
        ) : wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <div className="row">
            {wishlist.map((item) => (
              <div key={item._id} className="col-md-3 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src={item.book_id?.image}
                    className="card-img-top"
                    alt={item.book_id?.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.book_id?.title}</h5>
                    <p className="card-text">Author: {item.book_id?.author}</p>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
