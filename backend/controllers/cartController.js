// cartController.js
const Cart = require('../models/cartModel');

// Get the user's cart
async function getCart(req, res) {
    const { userId } = req.query;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let totalItems = 0;
        let totalPrice = 0;

        cart.items.forEach((item) => {
            totalItems += item.quantity;
            totalPrice += item.productId.price * item.quantity;
        });

        res.json({ cart, totalItems, totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart' });
    }
}



// Add a product to the cart

async function addToCart(req, res) {
    const { userId, products } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId });
        }

        for (const product of products) {
            const { productId, quantity } = product;
            const existingItem = cart.items.find(item => item.productId.equals(productId));

            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding items to cart' });
    }
}

// Remove an item from the cart
async function removeCartItem(req, res) {
    const { userId, itemId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item._id.equals(itemId));

        await cart.save();

        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing cart item' });
    }
}

// Increase the quantity of a product in the cart
async function increaseProductQuantity(req, res) {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.productId.equals(productId));

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        cartItem.quantity++;

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error increasing product quantity in cart' });
    }
}

// Decrease the quantity of a product in the cart
async function decreaseProductQuantity(req, res) {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.productId.equals(productId));

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        if (cartItem.quantity === 1) {
            // Remove the item from the cart if quantity becomes zero
            cart.items = cart.items.filter(item => !item._id.equals(cartItem._id));
        } else {
            cartItem.quantity--;
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error decreasing product quantity in cart' });
    }
}

// Clear all items in the cart
async function clearCart(req, res) {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart' });
    }
}

module.exports = {
    getCart,
    addToCart,
    removeCartItem,
    increaseProductQuantity,
    decreaseProductQuantity,
    clearCart
};
