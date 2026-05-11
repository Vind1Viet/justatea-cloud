import pool from '../config/db.js';

const Cart = {
    // Find cart by user ID
    async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM carts WHERE userId = ?', [userId]);
        if (rows.length === 0) {
            return this.createCart(userId);
        }
        return rows[0];
    },

    // Create a new cart for a user
    async createCart(userId) {
        const [result] = await pool.query('INSERT INTO carts (userId) VALUES (?)', [userId]);
        return { id: result.insertId, userId };
    },

    // Get all items in a cart
    async getCartItems(cartId) {
        const [rows] = await pool.query('SELECT * FROM cartItems WHERE cartId = ?', [cartId]);
        return rows.map(item => ({
            ...item,
            toppings: item.toppings && item.toppings.toString().trim() !== ""
                ? JSON.parse(item.toppings)
                : []
        }));
    },
    
    // Get a specific item in a cart
    async getCartItem(cartId, productId, size) {
        const [rows] = await pool.query('SELECT * FROM cartItems WHERE cartId = ? AND productId = ? AND size = ?', [cartId, productId, size]);
        return rows[0];
    },

    // Add an item to the cart
    async addItem(cartId, productId, productName, price, quantity, size, toppings) {
        const existingItem = await this.getCartItem(cartId, productId, size);

        if (existingItem) {
            await pool.query(
                'UPDATE cartItems SET quantity = quantity + ? WHERE cartId = ? AND productId = ? AND size = ?',
                [quantity, cartId, productId, size]
            );
            return { ...existingItem, quantity: existingItem.quantity + quantity };
        } else {
            const [result] = await pool.query(
                'INSERT INTO cartItems (cartId, productId, productName, price, quantity, size, toppings) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [cartId, productId, productName, price, quantity, size, JSON.stringify(toppings)]
            );
            return { id: result.insertId, cartId, productId, productName, price, quantity, size, toppings };
        }
    },

    // Update the quantity of an item in the cart
   async updateQuantity(cartId, productId, size, newQuantity) {
        if (newQuantity <= 0) {
            await this.removeItem(cartId, productId, size);
            return null;
        }
        const [result] = await pool.query(
            'UPDATE cartItems SET quantity = ? WHERE cartId = ? AND productId = ? AND size = ?',
            [newQuantity, cartId, productId, size]
        );
        return result.affectedRows > 0;
    },

    // Remove an item from the cart
    async removeItem(cartId, productId, size) {
        const [result] = await pool.query(
            'DELETE FROM cartItems WHERE cartId = ? AND productId = ? AND size = ?',
            [cartId, productId, size]
        );
        return result.affectedRows > 0; // true nếu có xóa, false nếu không tìm thấy
    },

    // Clear all items from the cart
    async clearCart(cartId) {
        const [result] = await pool.query(
            'DELETE FROM cartItems WHERE cartId = ?',
            [cartId]
        );
        return result.affectedRows; // số item đã xóa
    }
};

export default Cart;
