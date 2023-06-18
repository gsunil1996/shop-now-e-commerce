const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/authMiddleware');
const {
    getCart,
    addToCart,
    removeCartItem,
    increaseProductQuantity,
    decreaseProductQuantity
} = require('../controllers/cartController');

const router = express.Router();

// Get the user's cart
router.get('/cart', isAuthenticatedUser, getCart);

// Add a product to the cart
router.post('/cart/add', isAuthenticatedUser, addToCart);

// Remove an item from the cart
router.delete('/cart/remove', isAuthenticatedUser, removeCartItem);

// Increase product quantity in the cart
router.patch('/cart/increase', isAuthenticatedUser, increaseProductQuantity);

// Decrease product quantity in the cart
router.patch('/cart/decrease', isAuthenticatedUser, decreaseProductQuantity);

module.exports = router;
