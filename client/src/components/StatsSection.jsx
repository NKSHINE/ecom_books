import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsSection() {
  const [stats, setStats] = useState({});
  const [genreChartData, setGenreChartData] = useState({});

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/stats");
    setStats(res.data);

    setGenreChartData({
      labels: res.data.genreCounts?.map((g) => g._id),
      datasets: [
        {
          label: "Books per Genre",
          data: res.data.genreCounts?.map((g) => g.count),
          backgroundColor: "#007bff",
        },
      ],
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container mt-4">
      <h3>📈 Statistics Overview</h3>

      {/* Summary Cards */}
      <div className="row text-center my-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white p-3 rounded">
            <h5>Total Users</h5>
            <h3>{stats.userCount}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 rounded">
            <h5>Premium Users</h5>
            <h3>{stats.premiumUsers}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white p-3 rounded">
            <h5>Total Orders</h5>
            <h3>{stats.totalOrders}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white p-3 rounded">
            <h5>Total Revenue</h5>
            <h3>₹{stats.totalRevenue}</h3>
          </div>
        </div>
      </div>

      {/* Genre Distribution */}
      <div className="mt-5">
        <h4>📚 Genre Distribution</h4>
        {genreChartData.labels?.length > 0 ? (
          <Bar
            data={genreChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: "Books by Genre" },
              },
            }}
          />
        ) : (
          <p>No genre data available.</p>
        )}
      </div>

      {/* Low Stock Alerts */}
      <div className="mt-5">
        <h4>⚠️ Low Stock Alerts</h4>
        <ul className="list-group">
          {stats.lowStockBooks?.length > 0 ? (
            stats.lowStockBooks.map((book) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={book._id}
              >
                <span>{book.title}</span>
                <span className="badge bg-danger">Stock: {book.stock}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No low stock books.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default StatsSection;
