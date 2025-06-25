import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar2 from "./sidebar2"; // ✅ Import Sidebar2
import StatsSection from "./StatsSection";
import AddBookSection from "./AddBookSection";
import ManageBooksSection from "./ManageBooksSection.jsx";
import ManageUsersSection from "./ManageUsersSection";
import ManageOrdersSection from "./ManageOrdersSection";
import "./home.css"; // Assuming sidebar styles are here
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("stats");
  const [stats, setStats] = useState({});
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [isAdminChecked, setIsAdminChecked] = useState(false);

  const navigate = useNavigate();


  const checkAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      });

      if (res.data.role !== "admin") {
        alert("Access denied: Not an admin");
        
        navigate("/login");
      }else {
      setIsAdminChecked(true); // allow rendering only if admin
    }
    } catch (err) {
      console.error("Auth check failed:", err);
      alert("You are not logged in");
     
      navigate("/login");
    }
  };

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/stats");
    setStats(res.data);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders/all");
    setOrders(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    checkAdmin();
    fetchStats();
    fetchBooks();
    fetchOrders();
    fetchUsers();
  }, [fetchTrigger]);

  if (!isAdminChecked) return null; // Block rendering until check completes


  return (
    <div>
      {/* Sidebar2 is fixed at top */}
      <Sidebar2 user={true} />

      {/* Main content container */}
      <div className="container mt-5 pt-5">
        <h2>Admin Dashboard</h2>

        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeSection === "stats" && "active"}`}
              onClick={() => setActiveSection("stats")}
            >
              Stats
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeSection === "add" && "active"}`}
              onClick={() => setActiveSection("add")}
            >
              Add Book
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeSection === "books" && "active"}`}
              onClick={() => setActiveSection("books")}
            >
              Manage Books
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeSection === "users" && "active"}`}
              onClick={() => setActiveSection("users")}
            >
              Manage Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeSection === "orders" && "active"}`}
              onClick={() => setActiveSection("orders")}
            >
              Manage Orders
            </button>
          </li>
        </ul>

        <div className="mt-4">
          {activeSection === "stats" && <StatsSection stats={stats} />}
          {activeSection === "add" && <AddBookSection setFetchTrigger={setFetchTrigger} />}
          {activeSection === "books" && <ManageBooksSection books={books} setFetchTrigger={setFetchTrigger} />}
          {activeSection === "users" && <ManageUsersSection users={users} setFetchTrigger={setFetchTrigger} />}
          {activeSection === "orders" && <ManageOrdersSection orders={orders} setFetchTrigger={setFetchTrigger} />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;