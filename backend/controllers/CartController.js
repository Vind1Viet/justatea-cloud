import Cart from '../models/Cart.js';

const CartController = {
    // Get user's cart
    async getCart(req, res) {
        try {
            const userId = req.user.id; // assuming auth middleware assigns user to req
            let cart = await Cart.findByUserId(userId);

            if (!cart) {
                cart = await Cart.createCart(userId);
            }

            const items = await Cart.getCartItems(cart.id);
            res.json({ cart, items });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error occurred while fetching cart' });
        }
    },

    // Add item to cart
    async addItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId, productName, price, quantity, size, toppings } = req.body;

            let cart = await Cart.findByUserId(userId);
            if (!cart) {
                cart = await Cart.createCart(userId);
            }

            const item = await Cart.addItem(cart.id, productId, productName, price, quantity, size, toppings);
            res.status(201).json(item);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error occurred while adding item to cart' });
        }
    },

    // Update product quantity
    async updateQuantity(req, res) {
        try {
            const userId = req.user.id;
            const { productId, size, quantity } = req.body;

            const cart = await Cart.findByUserId(userId);
            if (!cart) return res.status(404).json({ message: 'Cart not found' });

            const success = await Cart.updateQuantity(cart.id, productId, size, quantity);
            if (success === null) {
                return res.json({ message: 'Item has been removed from cart' });
            }

            res.json({ message: 'Quantity updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error occurred while updating quantity' });
        }
    },

    // Remove an item from cart
    async removeItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId, size } = req.body;

            const cart = await Cart.findByUserId(userId);
            if (!cart) return res.status(404).json({ message: 'Cart not found' });

            const deleted = await Cart.removeItem(cart.id, productId, size);
            if (!deleted) return res.status(404).json({ message: 'Item not found in cart' });

            res.json({ message: 'Item removed successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error occurred while removing item from cart' });
        }
    },

    // Clear entire cart
    async clearCart(req, res) {
        try {
            const userId = req.user.id;

            const cart = await Cart.findByUserId(userId);
            if (!cart) return res.status(404).json({ message: 'Cart not found' });

            const count = await Cart.clearCart(cart.id);
            res.json({ message: `Removed ${count} items from cart` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error occurred while clearing cart' });
        }
    }
};

export default CartController;
