// ManageBooksSection.jsx
import React from "react";
import axios from "axios";
function ManageBooksSection({ books, setFetchTrigger }) {
  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setFetchTrigger(p => !p);
    }
  };
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Cover</th><th>Title</th><th>Author</th><th>Genre</th><th>Price</th><th>Stock</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            <td><img src={book.image} alt="cover" width="50" height="70" /></td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.price}</td>
            <td>{book.stock}</td>
            <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ManageBooksSection;