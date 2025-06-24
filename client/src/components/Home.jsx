import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import Sidebar from './Sidebar';

function Home() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    publisher: '',
    minPrice: '',
    maxPrice: ''
  });
  

   useEffect(() => {
    axios.get('http://localhost:5000/api/auth/user', { withCredentials: true })
      .then(res => {
        console.log('Fetched user:', res.data); // 👈 Add this
        setUser(res.data);
      })
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

  // Real-time filtering
  useEffect(() => {
    const filtered = allBooks.filter(book => {
      const matchGenre = filters.genre ? book.genre === filters.genre : true;
      const matchAuthor = filters.author ? book.author === filters.author : true;
      const matchPublisher = filters.publisher ? book.publisher === filters.publisher : true;
      const matchMinPrice = filters.minPrice ? book.price >= parseFloat(filters.minPrice) : true;
      const matchMaxPrice = filters.maxPrice ? book.price <= parseFloat(filters.maxPrice) : true;
      return matchGenre && matchAuthor && matchPublisher && matchMinPrice && matchMaxPrice;
    });
    setBooks(filtered);
  }, [filters, allBooks]);

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      genre: '',
      author: '',
      publisher: '',
      minPrice: '',
      maxPrice: ''
    });
  };
  const handleSearch = (term) => {
  if (!term.trim()) {
    setBooks(allBooks); // show all if empty
  } else {
    const filtered = allBooks.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()) ||
      book.genre.toLowerCase().includes(term.toLowerCase())
    );
    setBooks(filtered);
  }
};


  const genres = [...new Set(allBooks.map(b => b.genre).filter(Boolean))];
  const authors = [...new Set(allBooks.map(b => b.author).filter(Boolean))];
  const publishers = [...new Set(allBooks.map(b => b.publisher).filter(Boolean))];

  return (
    <div className="home-container">
      <Sidebar user={user} onSearch={handleSearch} />


      <div className="main-content">
        {/* Filter Section */}
        <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
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
          <button type="button" onClick={handleClearFilters}>Clear Filters</button>
        </form>

        {user && (
          <div className="greeting-text">
            Hi, {user.full_name || 'User'}!
          </div>
        )}

        {/* Books Grid */}
        <div className="book-section">
          <div className="book-grid">
            {books.length === 0 ? (
              <div className="no-books">No books found for selected filters.</div>
            ) : (
              books.map(book => (
                <div key={book._id} className="book-card">
                  <Link to={`/books/${book._id}`} className="book-link">
                    <img src={book.image} alt={book.title} className="book-img" />
                    <h5>{book.title}</h5>
                    <div className="book-meta">
                      <span>{book.author}</span>
                      <span className="price">₹{book.price}</span>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
