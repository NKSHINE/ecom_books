import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Your fixed left sidebar

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`http://localhost:5000/api/orders?user_id=${user._id}`, {
          withCredentials: true,
        })
        .then((res) => setOrders(res.data))
        .catch((err) => {
          console.error(err);
          alert("Failed to load orders");
        });
    }
  }, [user]);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container mt-4" style={{ marginLeft: "220px" }}>
        <h2 className="mb-4">📦 Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Order #{idx + 1}</h5>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Price:</strong> ₹{order.total_price}</p>
                <p><strong>Delivery Address:</strong> {order.shipping_address}</p>
                <p><strong>Payment Method:</strong> {order.payment_method}</p>
                <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <h6>📚 Items:</h6>
                <ul className="list-group list-group-flush">
                  {order.items.map((item, i) => (
                    <li key={i} className="list-group-item">
                      Book ID: {item.book_id} — Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
