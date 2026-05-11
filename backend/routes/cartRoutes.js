import express from 'express';
import CartController from '../controllers/CartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
// Sử dụng middleware auth để bảo vệ các route
router.use(authMiddleware());

// Định nghĩa các route cho giỏ hàng
router.get('/', CartController.getCart);
router.post('/items', CartController.addItem);
router.put('/items/quantity', CartController.updateQuantity);
router.delete('/items', CartController.removeItem);
router.delete('/', CartController.clearCart);

export default router;
