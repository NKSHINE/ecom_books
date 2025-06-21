import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // optional if you're using a fixed sidebar

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/wishlist", { withCredentials: true })
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error("Failed to fetch wishlist:", err));
  }, []);

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
      <Sidebar /> {/* Optional */}
      <div className="container mt-4" style={{ marginLeft: "220px" }}>
        <h2 className="mb-4">💖 Your Wishlist</h2>
        {wishlist.length === 0 ? (
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
