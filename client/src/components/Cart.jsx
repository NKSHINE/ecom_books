import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:5000/api/cart", { withCredentials: true })
        .then(res => setItems(res.data))
        .catch(() => alert("Failed to load cart"));
    }
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {items.map((item, i) => (
        <div className="card mb-2" key={i}>
          <div className="card-body">
            <h5>{item.book_id?.title}</h5>
            <p>Author: {item.book_id?.author}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.book_id?.price}</p>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
