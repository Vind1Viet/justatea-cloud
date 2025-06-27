const express = require('express');
require('dotenv').config();
const db = require('./db');

const cors = require('cors');

const app = express();

app.use(cors());


app.get('/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Products');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;    
    try {
        const [rows] = await db.query('SELECT * FROM Products WHERE id = ?', [productId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/products', async (req, res) => {
  const { name, price, category, image } = req.body;
  const query = 'INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)';
  await db.execute(query, [name, price, category, image]);
  res.status(201).send({ message: 'Sản phẩm đã được thêm' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
