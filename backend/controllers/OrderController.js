import Order from '../models/Order.js';

const OrderController = {
    async createOrder(req, res) {
        try {
            const userId = req.user.id;
            const { items } = req.body;

            if (!items || items.length === 0)
                return res.status(400).json({ message: "Order items required" });

            // calculate total
            const totalPrice = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            const order = await Order.createOrder(userId, items, totalPrice);

            res.status(201).json(order);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error creating order" });
        }
    },

    async getMyOrders(req, res) {
        try {
            const userId = req.user.id;
            const orders = await Order.findByUserId(userId);
            res.json(orders);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching orders" });
        }
    },

    async getOrderDetail(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await Order.findById(orderId);

            if (!order) return res.status(404).json({ message: "Order not found" });

            res.json(order);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching order details" });
        }
    },

    async updateOrderStatus(req, res) {
        try {
            const { status } = req.body;
            const orderId = req.params.orderId;

            const success = await Order.updateStatus(orderId, status);

            if (!success) return res.status(404).json({ message: "Order not found" });

            res.json({ message: "Order status updated" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error updating order status" });
        }
    },

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            const success = await Order.deleteOrder(orderId);

            if (!success) return res.status(404).json({ message: "Order not found" });

            res.json({ message: "Order deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error deleting order" });
        }
    }
};

export default OrderController;
