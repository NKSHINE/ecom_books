// components/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/cart')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeItem = (id) => {
    axios.delete(`/api/cart/${id}`)
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>No items in cart</p> : (
        <ul className="list-group">
          {items.map(item => (
            <li className="list-group-item d-flex justify-content-between" key={item._id}>
              {item.book_id.title} - Qty: {item.quantity}
              <button className="btn btn-danger btn-sm" onClick={() => removeItem(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Cart;
