import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    price: "",
    stock: "",
    language: "",
    publisher: "",
    image: "",
    tags: "",
    is_featured: false,
    offer: {
      discount_percent: "",
      valid_till: "",
    },
  });

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
    </div>
  );
}

export default AdminDashboard;
