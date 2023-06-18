// cartModel.js

const mongoose = require('mongoose');

// Define the cart schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

// Create the cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
