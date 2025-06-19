// components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
const [books, setBooks] = useState([]);
const [featuredBooks, setFeaturedBooks] = useState([]);
const [sidebarOpen, setSidebarOpen] = useState(false);

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

const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

return (
<div className="home-container">
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
<Link className="navbar-brand" to="/">📚 PlayBooks</Link>
<button className="btn btn-outline-dark d-lg-none" onClick={toggleSidebar}>
☰
</button>
<div className="ms-auto d-none d-lg-flex gap-2">
<Link to="/orders" className="btn btn-outline-info">Orders</Link>
<Link to="/cart" className="btn btn-outline-success">Cart</Link>
<Link to="/wishlist" className="btn btn-outline-danger">Wishlist</Link>
</div>
</nav>


  <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
    <button onClick={toggleSidebar} className="close-btn">&times;</button>
    <Link to="/orders">Orders</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/wishlist">Wishlist</Link>
  </div>

  <div className="container mt-4">
    <h2 className="mb-3">🌟 Featured Books</h2>
    <div className="row">
      {featuredBooks.map(book => (
        <div key={book._id} className="col-md-3 mb-4">
          <Link to={`/books/${book._id}`} className="card h-100 text-decoration-none text-dark">
            <img src={book.image} alt={book.title} className="card-img-top featured-img" />
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