// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import StatsSection from "./StatsSection";
import AddBookSection from "./AddBookSection";
import ManageBooksSection from "./ManageBooksSection.jsx";
import ManageUsersSection from "./ManageUsersSection";
import ManageOrdersSection from "./ManageOrdersSection";
function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("stats");
  const [stats, setStats] = useState({});
  const [books, setBooks] = useState([]);
  const[orders, setOrders] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/stats");
    setStats(res.data);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const fetchOrders = async () => {
    const res= await axios.get("http://localhost:5000/api/orders/all");
    setOrders(res.data);
  }

  useEffect(() => {
    fetchStats();
    fetchBooks();
    fetchOrders();
  }, [fetchTrigger]);

  return (
    <div className="container mt-4">
      <h2>📊 Admin Dashboard</h2>

      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <button className={`nav-link ${activeSection === "stats" && "active"}`} onClick={() => setActiveSection("stats")}>Stats</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeSection === "add" && "active"}`} onClick={() => setActiveSection("add")}>Add Book</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeSection === "books" && "active"}`} onClick={() => setActiveSection("books")}>Manage Books</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeSection === "users" && "active"}`} onClick={() => setActiveSection("users")}>Manage Users</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeSection === "orders" && "active"}`} onClick={() => setActiveSection("orders")}>Manage Orders</button>
        </li>
      </ul>

      <div className="mt-4">
        {activeSection === "stats" && <StatsSection stats={stats} />}
        {activeSection === "add" && <AddBookSection setFetchTrigger={setFetchTrigger} />}
        {activeSection === "books" && <ManageBooksSection books={books} setFetchTrigger={setFetchTrigger} />}
        {activeSection === "users" && <ManageUsersSection stats={users} setFetchTrigger={setFetchTrigger} />}
        {activeSection === "orders" && <ManageOrdersSection orders={orders} setFetchTrigger={setFetchTrigger} />}
      </div>
    </div>
  );
}

export default AdminDashboard;