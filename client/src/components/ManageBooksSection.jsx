import React, { useState } from "react";
import axios from "axios";

function ManageBooksSection({ books, setFetchTrigger }) {
  const [editBook, setEditBook] = useState(null);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setEditBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/books/${editBook._id}`, editBook);
      setEditBook(null);
      setFetchTrigger((p) => !p);
    } catch (err) {
      console.error(err);
      alert("Failed to update book");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setFetchTrigger((p) => !p);
    }
  };

  return (
    <>
      {editBook && (
        <div className="card p-4 mb-4">
          <h5>Edit Book</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Title</label>
              <input type="text" name="title" className="form-control" value={editBook.title} onChange={handleBookChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Author</label>
              <input type="text" name="author" className="form-control" value={editBook.author} onChange={handleBookChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Genre</label>
              <input type="text" name="genre" className="form-control" value={editBook.genre} onChange={handleBookChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Language</label>
              <input type="text" name="language" className="form-control" value={editBook.language} onChange={handleBookChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Publisher</label>
              <input type="text" name="publisher" className="form-control" value={editBook.publisher} onChange={handleBookChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Price</label>
              <input type="number" name="price" className="form-control" value={editBook.price} onChange={handleBookChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Stock</label>
              <input type="number" name="stock" className="form-control" value={editBook.stock} onChange={handleBookChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input type="text" name="image" className="form-control" value={editBook.image} onChange={handleBookChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" value={editBook.description} onChange={handleBookChange} rows="3" />
            </div>
            <div className="col-12">
              <button className="btn btn-success me-2" onClick={handleBookUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={() => setEditBook(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td><img src={book.image} alt="cover" width="50" height="70" /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>₹{book.price}</td>
              <td>{book.stock}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditBook(book)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManageBooksSection;
