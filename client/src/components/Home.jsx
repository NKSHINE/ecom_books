import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Make sure the path is correct

function Home() {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((res) => {
        setBooks(res.data);
        setFeaturedBooks(res.data.filter(book => book.is_featured));
      });
  }, []);

  const groupedBooks = books.reduce((groups, book) => {
    const category = book.genre || 'Other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(book);
    return groups;
  }, {});

  return (
    <div className="d-flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content beside sidebar */}
      <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 mb-4">
          <Link className="navbar-brand" to="/">📚 PlayBooks</Link>
          <div className="ms-auto d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </nav>

        <h2 className="mb-3">🌟 Featured Books</h2>
        <div className="row">
          {featuredBooks.map(book => (
            <div key={book._id} className="col-md-3 mb-4">
              <Link to={`/books/${book._id}`} className="card h-100 text-decoration-none text-dark">
                <img src={book.image} alt={book.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <hr />

        {Object.entries(groupedBooks).map(([genre, books]) => (
          <div key={genre}>
            <h3 className="mt-4">{genre}</h3>
            <div className="row">
              {books.map(book => (
                <div key={book._id} className="col-md-3 mb-4">
                  <Link to={`/books/${book._id}`} className="card h-100 text-decoration-none text-dark">
                    <img src={book.image} alt={book.title} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">{book.author}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
