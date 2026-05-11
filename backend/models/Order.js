import pool from '../config/db.js';

const Order = {
    // Create a new order
    async createOrder(userId, items, totalPrice, status = 'pending') {
        const [result] = await pool.query(
            'INSERT INTO orders (userId, totalPrice, status) VALUES (?, ?, ?)', 
            [userId, totalPrice, status]
        );
        
        const orderId = result.insertId;

        for (const item of items) {
            await pool.query(
                'INSERT INTO orderItems (orderId, productId, productName, price, quantity, size, toppings) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                [orderId, item.productId, item.productName, item.price, item.quantity, item.size, item.toppings]
            );
        }
        return { id: orderId, userId, items, totalPrice, status };
    }, 

    // Find orders by user ID
    async findUserByID(userId) {
        const row = await pool.query('SELECT * FROM orders WHERE userId = ?', [userId]);
        return row[0];
    },

    // Find order by order ID
    async findById(orderId) {
        const [order] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (order.length === 0) {
            return null;
        }

        const [items] = await pool.query('SELECT * FROM orderItems WHERE orderId = ?', [orderId]);
        
        const parsedItems = items.map(item => ({
            ...item,
            toppings:
                item.toppings && item.toppings.toString().trim() !== ""
                    ? JSON.parse(item.toppings)
                    : []
        }));

        return {
            ...order[0],
            items: parsedItems
        };
    },

    // Update order status
    async updateStatus(orderId, status) {
        const [result] = await pool.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, orderId]
        );
        return result.affectedRows > 0;
    },

    // Delete an order
    async deleteOrder(orderId) {
        await pool.query('DELETE FROM orderItems WHERE orderId = ?', [orderId]);
        const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [orderId]);
        return result.affectedRows > 0;
    }
};

export default Order;   