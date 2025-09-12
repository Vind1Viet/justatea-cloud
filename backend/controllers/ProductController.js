import Product from '../models/Product.js';

const ProductController = {
  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get product by ID
  async getProductById(req, res) {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Add new product
  async createProduct(req, res) {
    try {
      const { name, image_url, category, description, price, stock } = req.body;
      if (!name || !price) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const product = await Product.create({ name, image_url, category, description, price, stock });
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Update product
  async updateProduct(req, res) {
    try {
      const { name, image_url, category, description, price, stock } = req.body;
      const result = await Product.update(req.params.id, { name, image_url, category, description, price, stock });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product updated successfully", product: result });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Delete product
  async deleteProduct(req, res) {
    try {
      const affected = await Product.delete(req.params.id);
      if (affected === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};

export default ProductController;
