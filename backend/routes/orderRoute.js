import express from "express";
import OrderController from "../controllers/OrderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// protect all routes
router.use(authMiddleware());

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getMyOrders);
router.get("/:orderId", OrderController.getOrderDetail);
router.put("/:orderId/status", OrderController.updateOrderStatus);
router.delete("/:orderId", OrderController.deleteOrder);

export default router;
