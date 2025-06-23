import React from "react";

function ManageOrdersSection({ orders }) {
  return (
    <div className="mt-4">
      <h4>📦 Manage Orders</h4>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Books Ordered</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user_id?.full_name || "Unknown User"}</td>
                <td>
                  <ul className="list-unstyled mb-0">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.book_id?.title || "Unknown Book"} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.total_price}</td>
                <td>{order.shipping_address}</td>
                <td>{order.payment_method}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageOrdersSection;
