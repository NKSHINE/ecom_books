import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({});
  const [genreChartData, setGenreChartData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats")
      .then(res => {
        setStats(res.data);
        setGenreChartData({
          labels: res.data.genreCounts.map(g => g._id),
          datasets: [{
            label: 'Books per Genre',
            data: res.data.genreCounts.map(g => g.count),
            backgroundColor: '#007bff'
          }]
        });
      });
  }, []);

  const [form, setForm] = useState({title: "",author: "",genre: "",
    description: "",price: "",stock: "",language: "",publisher: "",image: "",tags: "",is_featured: false,
    offer: {discount_percent: "",valid_till: "",},});

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("offer.")) {
      const key = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        offer: { ...prev.offer, [key]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      tags: form.tags.split(",").map(t => t.trim()),
      offer: {
        discount_percent: parseFloat(form.offer.discount_percent),
        valid_till: form.offer.valid_till,
      },
    };
    await axios.post("http://localhost:5000/api/books", payload);
    setForm({ ...form, title: "" }); // reset form
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    }
  };

  const handleEdit = (book) => {
    setForm({
      ...book,
      tags: book.tags.join(", "),
      offer: {
        discount_percent: book.offer?.discount_percent || "",
        valid_till: book.offer?.valid_till?.slice(0, 10) || "",
      },
    });
  };

  const handleUpdate = async () => {
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      tags: form.tags.split(",").map(t => t.trim()),
    };
    await axios.put(`http://localhost:5000/api/books/${form._id}`, payload);
    setForm({ ...form, title: "" });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard - Manage Books</h2>
      <form onSubmit={form._id ? handleUpdate : handleSubmit} className="row g-3 mt-3">
        {[
          "title", "author", "genre", "description",
          "price", "stock", "language", "publisher", "image"
        ].map((field, i) => (
          <div className="col-md-6" key={i}>
            <label className="form-label">{field}</label>
            <input
              type={field === "price" || field === "stock" ? "number" : "text"}
              name={field}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              required={field === "title" || field === "price"}
            />
          </div>
        ))}
        <div className="col-md-6">
          <label className="form-label">Tags (comma separated)</label>
          <input type="text" name="tags" className="form-control" value={form.tags} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Featured?</label><br />
          <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Discount %</label>
          <input type="number" name="offer.discount_percent" className="form-control" value={form.offer.discount_percent} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Valid Till</label>
          <input type="date" name="offer.valid_till" className="form-control" value={form.offer.valid_till} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {form._id ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>

      <hr />
      <h4>All Books</h4>
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Price</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>₹{book.price}</td>
              <td>{book.stock}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      <div className="mt-5">
        <h4>📚 Genre Distribution</h4>
        {genreChartData.labels?.length > 0 && (
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
        )}
      </div>

      <div className="mt-5">
        <h4>⚠️ Low Stock Alerts</h4>
        <ul className="list-group">
          {stats.lowStockBooks?.map(book => (
            <li className="list-group-item d-flex justify-content-between" key={book._id}>
              <span>{book.title}</span>
              <span className="badge bg-danger">Stock: {book.stock}</span>
            </li>
          ))}
        </ul>
      </div>


    </div>

    

  );
}

export default AdminDashboard;
