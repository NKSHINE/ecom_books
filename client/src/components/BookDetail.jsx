import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`).then((res) => {
      setBook(res.data);
    });

    axios.get(`http://localhost:5000/api/reviews/${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id]);

  const handleAddToCart = () => {
    axios.post("http://localhost:5000/api/cart",
      { book_id: id, quantity: qty },
      { withCredentials: true }
    ).then(() => alert("Added to cart"));
  };

  const handleBuyNow = () => {
    setShowForm(true); // show address and payment prompt
  };

  const confirmBuyNow = () => {
    if (!address.trim() || !paymentMethod) {
      return alert("Please enter address and select a payment method");
    }

    const payload = {
      items: [{ book_id: id, quantity: qty }],
      total_price: book.price * qty,
      shipping_address: address,
      payment_method: paymentMethod,
    };

    axios
      .post("http://localhost:5000/api/orders", payload, { withCredentials: true })
      .then(() => {
        alert("Order placed successfully");
        setShowForm(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to place order");
      });
  };

  const handleAddToWishlist = () => {
    axios.post(
      "http://localhost:5000/api/wishlist",
      { book_id: id },
      { withCredentials: true }
    )
    .then(() => alert("Added to wishlist"))
    .catch(() => alert("Failed to add to wishlist"));
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container mt-4" style={{ marginLeft: "220px" }}>
        <div className="card p-4 shadow">
          <div className="row">
            <div className="col-md-4">
              <img
                src={book.image || "https://via.placeholder.com/300"}
                className="img-fluid rounded"
                alt={book.title}
              />
            </div>
            <div className="col-md-8">
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Language:</strong> {book.language}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
              {book.offer?.discount_percent && (
                <p><strong>Offer:</strong> {book.offer.discount_percent}% off until {new Date(book.offer.valid_till).toLocaleDateString()}</p>
              )}
              <p><strong>Stock:</strong> {book.stock}</p>

              <div className="mb-3">
                <label><strong>Quantity:</strong></label>
                <input
                  type="number"
                  min="1"
                  max={book.stock}
                  className="form-control w-25"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button>
                <button className="btn btn-warning" onClick={handleAddToWishlist}>Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Now Prompt Form */}
        {showForm && (
          <div className="card mt-4 p-4 shadow">
            <h4>Shipping Details</h4>

            <div className="mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="mb-3">
              <label>Payment Method</label>
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmBuyNow}>🛍️ Confirm & Pay</button>
            </div>
          </div>
        )}

        <hr />
        <h4>User Reviews</h4>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div className="card mb-2 p-2" key={r._id}>
              <strong>Rating:</strong> {r.rating}⭐ <br />
              <strong>Comment:</strong> {r.comment}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookDetail;
