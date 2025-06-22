import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';

function Home() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    publisher: '',
    minPrice: '',
    maxPrice: ''
  });
  const [user, setUser] = useState(null); // Track logged-in user

  // Get current user
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Fetch books
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => {
        setBooks(res.data);
        setAllBooks(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = (e) => {
    e.preventDefault();

    axios.get('http://localhost:5000/api/books', {
      params: {
        genre: filters.genre || undefined,
        author: filters.author || undefined,
        publisher: filters.publisher || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined
      }
    })
    .then(res => setBooks(res.data))
    .catch(err => console.error(err));
  };

  const genres = [...new Set(allBooks.map(b => b.genre).filter(Boolean))];
  const authors = [...new Set(allBooks.map(b => b.author).filter(Boolean))];
  const publishers = [...new Set(allBooks.map(b => b.publisher).filter(Boolean))];

  return (
    <div className="d-flex">
      <Sidebar />

      <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 mb-4">
          <Link className="navbar-brand" to="/">📚 PlayBooks</Link>
          
          <div className="ms-auto">
            {user ? (
              <Link to="/profile" className="btn btn-outline-secondary">
                <i className="bi bi-person-circle"></i> Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        {/* Filter Section */}
        <div className="card mb-4 p-3">
          <form className="row g-3" onSubmit={handleApply}>
            <div className="col-md-2">
              <select name="genre" className="form-select" value={filters.genre} onChange={handleFilterChange}>
                <option value="">All Genres</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <select name="author" className="form-select" value={filters.author} onChange={handleFilterChange}>
                <option value="">All Authors</option>
                {authors.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <select name="publisher" className="form-select" value={filters.publisher} onChange={handleFilterChange}>
                <option value="">All Publishers</option>
                {publishers.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="minPrice"
                className="form-control"
                placeholder="Min ₹"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="maxPrice"
                className="form-control"
                placeholder="Max ₹"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Apply</button>
            </div>
          </form>
        </div>

        {/* Books Grid */}
        <div className="row">
          {books.length === 0 ? (
            <div className="text-center text-muted">No books found for selected filters.</div>
          ) : (
            books.map(book => (
              <div key={book._id} className="col-md-3 mb-4">
                <Link to={`/books/${book._id}`} className="card h-100 text-decoration-none text-dark">
                  <img src={book.image} alt={book.title} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author}</p>
                    <p className="card-text">₹{book.price}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
