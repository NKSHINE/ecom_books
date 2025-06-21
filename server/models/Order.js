const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [
    {
      book_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true 
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  total_price: { 
    type: Number, 
    required: true 
  },
  shipping_address: { 
    type: String, 
    required: true 
  },
  payment_method: {
    type: String,
    enum: ['Cash on Delivery', 'Online'],
    required: true  // ⛔ removed default, made required
  },
  status: { 
    type: String, 
    enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
