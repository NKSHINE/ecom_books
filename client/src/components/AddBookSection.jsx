// AddBookSection.jsx
import React, { useState } from "react";
import axios from "axios";

function AddBookSection({ setFetchTrigger }) {
  const [form, setForm] = useState({
    title: "", author: "", genre: "", description: "",
    price: "", stock: "", language: "", publisher: "",
    image: "", tags: "", is_featured: false,
    offer: { discount_percent: "", valid_till: "" },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("offer.")) {
      const key = name.split(".")[1];
      setForm(prev => ({ ...prev, offer: { ...prev.offer, [key]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    setForm({ title: "", author: "", genre: "", description: "", price: "", stock: "", language: "", publisher: "", image: "", tags: "", is_featured: false, offer: { discount_percent: "", valid_till: "" } });
    setFetchTrigger(p => !p);
  };

  return (
    <div className="container my-4">
      <div className="p-4 shadow rounded bg-white w-100">
        <h4 className="mb-4">Add a New Book</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          {Object.entries({ title: "", author: "", genre: "", description: "", price: "", stock: "", language: "", publisher: "", image: "" }).map(([field], i) => (
            <div className="col-md-6" key={i}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                type={["price", "stock"].includes(field) ? "number" : "text"}
                name={field}
                className="form-control"
                value={form[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="col-md-6">
            <label className="form-label">Tags</label>
            <input type="text" name="tags" className="form-control" value={form.tags} onChange={handleChange} />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <div>
              <label className="form-label d-block">Featured</label>
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Discount %</label>
            <input type="number" name="offer.discount_percent" className="form-control" value={form.offer.discount_percent} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Valid Till</label>
            <input type="date" name="offer.valid_till" className="form-control" value={form.offer.valid_till} onChange={handleChange} />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookSection;