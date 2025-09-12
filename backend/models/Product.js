import pool from "../config/db.js";

const Product = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async create(product) {
    const { name, image_url, category, description, price, stock } = product;
    const [result] = await pool.query(
      "INSERT INTO products (name, image_url, category, description, price, stock) VALUES (?, ?, ?, ?, ?, ?)",
      [name, image_url, category, description, price, stock]
    );
    return { id: result.insertId, ...product };
  },

  async update(id, product) {
    const { name, image_url, category, description, price, stock } = product;
    const [result] = await pool.query(
      "UPDATE products SET name = ?, image_url = ?, category = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [name, image_url, category, description, price, stock, id]
    );
    return { id, affectedRows: result.affectedRows, ...product };
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

export default Product;
