import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/orders", { withCredentials: true })
    .then((res) => setOrders(res.data))
    .catch((err) => {
      console.error(err);
      alert("Failed to load orders");
    });
}, []);


  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4" style={{ marginLeft: "220px" }}>
        <h2 className="mb-4">📦 Your Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="card mb-4 shadow">
              <div className="card-body">
                <h5 className="card-title">Order #{idx + 1}</h5>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.total_price}</p>
                <p><strong>Address:</strong> {order.shipping_address}</p>
                <p><strong>Payment:</strong> {order.payment_method}</p>
                <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <div className="row">
                  {order.items.map((item, i) => (
                    <div key={i} className="col-md-4 mb-3">
                      <div className="card h-100">
                        <img
                          src={item.book_id?.image || "https://via.placeholder.com/150"}
                          className="card-img-top"
                          alt={item.book_id?.title}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h6 className="card-title">{item.book_id?.title}</h6>
                          <p className="card-text">Author: {item.book_id?.author}</p>
                          <p className="card-text">Qty: {item.quantity}</p>
                          <p className="card-text">Price: ₹{item.book_id?.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
