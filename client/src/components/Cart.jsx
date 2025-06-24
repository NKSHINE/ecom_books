import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Cart.css";

function Cart() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Fetch logged-in user
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Fetch cart if user is logged in
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = () => {
    axios
      .get("http://localhost:5000/api/cart", { withCredentials: true })
      .then((res) => setItems(res.data))
      .catch(() => alert("Failed to load cart"));
  };

  const updateQuantity = (bookId, newQty) => {
    if (newQty < 1) return;

    axios
      .put(
        "http://localhost:5000/api/cart",
        { book_id: bookId, quantity: newQty },
        { withCredentials: true }
      )
      .then(fetchCart)
      .catch(() => alert("Failed to update quantity"));
  };

  const handleOrder = () => {
    if (!address.trim() || !paymentMethod) {
      return alert("Please enter address and select a payment method");
    }

    const total = items.reduce(
      (sum, item) => sum + item.book_id.price * item.quantity,
      0
    );
    const orderItems = items.map((item) => ({
      book_id: item.book_id._id,
      quantity: item.quantity,
    }));

    axios
      .post(
        "http://localhost:5000/api/orders",
        {
          items: orderItems,
          total_price: total,
          shipping_address: address,
          payment_method: paymentMethod,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("Order placed!");
        setItems([]);
        setShowForm(false);
      })
      .catch(() => alert("Failed to place order"));
  };

  return (
    <div className="d-flex">
      <Sidebar user={user} />
      <div className="cart-wrapper">
        <h2 className="cart-heading"><img src="/icons/cart.png" alt="Cart" className="cart-icon" /> Your Cart</h2>

        {!user ? (
          <p>
            Please <a href="/login">login</a> to view your cart.
          </p>
        ) : items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-box">
              {items.map((item, i) => (
                <div className="cart-item" key={i}>
                  <div className="book-card-img">
                    <img
                      src={item.book_id?.image || "https://via.placeholder.com/150"}
                      alt={item.book_id?.title}
                    />
                  </div>
                  <div className="book-details">
                    <h5 className="book-title">{item.book_id?.title}</h5>
                    <p className="text-muted">Author: {item.book_id?.author}</p>
                    <div className="book-meta">
                      <span className="price">₹{item.book_id?.price}</span>
                    </div>
                    <div className="quantity-controls">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateQuantity(item.book_id._id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateQuantity(item.book_id._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-end mt-3">
              <button
                className="btn btn-success"
                onClick={() => setShowForm(true)}
              >
                 Place Order
              </button>
            </div>
          </>
        )}

        {showForm && user && (
          <div className="order-form">
            <h4>Shipping Details</h4>
            <div className="mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="mb-3">
              <label>Payment Method</label>
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleOrder}>
                🛍️ Confirm & Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;