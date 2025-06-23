import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

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
    <div className="home-container">
      <Sidebar user={user} />

      <div className="main-content">
        {/* Filter Section */}
        <form className="filter-form" onSubmit={handleApply}>
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">All Genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select name="author" value={filters.author} onChange={handleFilterChange}>
            <option value="">All Authors</option>
            {authors.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select name="publisher" value={filters.publisher} onChange={handleFilterChange}>
            <option value="">All Publishers</option>
            {publishers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input type="number" name="minPrice" placeholder="Min ₹" value={filters.minPrice} onChange={handleFilterChange} />
          <input type="number" name="maxPrice" placeholder="Max ₹" value={filters.maxPrice} onChange={handleFilterChange} />
          <button type="submit">Apply</button>
        </form>
        {user && (
  <div className="greeting-text">
    Hi, {user.name || user.username || 'User'}!
  </div>
)}
        {/* Books Grid */}
        <div className="book-grid">
          {books.length === 0 ? (
            <div className="no-books">No books found for selected filters.</div>
          ) : (
            books.map(book => (
              <div key={book._id} className="book-card">
                <Link to={`/books/${book._id}`} className="book-link">
                  <img src={book.image} alt={book.title} className="book-img" />
                  <h5>{book.title}</h5>
                  <p>{book.author}</p>
                  <p>₹{book.price}</p>
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