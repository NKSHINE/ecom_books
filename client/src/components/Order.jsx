import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Orders.css"; // optional if you want to separate styles

function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders", { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const cancelOrder = (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    axios
      .put(`http://localhost:5000/api/orders/cancel/${id}`, {}, { withCredentials: true })
      .then(() => {
        alert("Order cancelled");
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: "Cancelled" } : o))
        );
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to cancel order");
      });
  };

  return (
    <div className="d-flex">
      <Sidebar user={user} />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📦 Your Orders</h2>

        {!user ? (
          <p className="text-center">
            Please <a href="/login">login</a> to view your orders.
          </p>
        ) : orders.length === 0 ? (
          <p className="text-center">You haven't placed any orders yet.</p>
        ) : (
          <div className="order-wrapper mx-auto">
            {orders.map((order, idx) => (
              <div key={idx} className="order-box shadow mb-4 p-3 bg-white rounded">
                <div className="d-flex justify-content-between mb-3">
                  <h5>Order #{idx + 1}</h5>
                  <p className="mb-0">
                    <strong>Status:</strong> {order.status}
                    {order.status !== "Cancelled" && order.status !== "Delivered" && (
                      <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </p>
                </div>

                <div className="row g-3">
                  {order.items.map((item, i) => {
                    const isDeleted = !item.book_id;

                    return (
                      <div key={i} className="col-md-12">
                        <div className="d-flex align-items-center item-box shadow-sm p-2 bg-light rounded">
                          <img
                            src={
                              isDeleted
                                ? "https://via.placeholder.com/150?text=Book+Deleted"
                                : item.book_id.image
                            }
                            alt={
                              isDeleted ? "Deleted Book" : item.book_id.title
                            }
                            className="order-img rounded"
                          />
                          <div className="ms-3 flex-grow-1">
                            <h6>{isDeleted ? "Book Deleted" : item.book_id.title}</h6>
                            <p className="mb-1">
                              {isDeleted
                                ? "No author information"
                                : `Author: ${item.book_id.author}`}
                            </p>
                            <p className="mb-1">Qty: {item.quantity}</p>
                            <p className="mb-1">
                              {isDeleted
                                ? "Price: N/A"
                                : `Price: ₹${item.book_id.price}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3">
                  <p><strong>Total:</strong> ₹{order.total_price}</p>
                  <p><strong>Address:</strong> {order.shipping_address}</p>
                  <p><strong>Payment:</strong> {order.payment_method}</p>
                  <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
    
  );
}

export default Orders;