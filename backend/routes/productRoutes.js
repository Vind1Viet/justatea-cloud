import express from 'express';
const router = express.Router();
import ProductController from '../controllers/ProductController.js';

// GET /api/products
router.get("/", ProductController.getAllProducts);

// GET /api/products/:id
router.get("/:id", ProductController.getProductById);

// POST /api/products
router.post("/", ProductController.createProduct);
//router.post("/", authMiddleware("admin"), ProductController.createProduct);

// PUT /api/products/:id
router.put("/:id", ProductController.updateProduct);
//router.put("/:id", authMiddleware("admin"), ProductController.updateProduct);

// DELETE /api/products/:id
router.delete("/:id", ProductController.deleteProduct);
//router.delete("/:id", authMiddleware("admin"), ProductController.deleteProduct);

export default router;
