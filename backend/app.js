const express = require('express');
require('dotenv').config();
const db = require('./db');
const cors = require('cors');
const { redisClient, connectRedis } = require('./redis');

const app = express();
app.use(cors());
app.use(express.json());

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
    const cacheKey = `product:${productId}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('Cache hit');
            return res.json(JSON.parse(cachedData));
        }

        const [rows] = await db.query('SELECT * FROM Products WHERE id = ?', [productId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = rows[0];

        // Save to cache for 1 hour
        await redisClient.set(cacheKey, JSON.stringify(product), { EX: 3600 });

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/products', async (req, res) => {
  const { name, image, price, tag } = req.body;

  // kiểm tra đơn giản
  if (!name || !price || !tag || !image) {	
    return res.status(400).json({ error: "Missing product infomation" });
  }

  const query = 'INSERT INTO Products (name, image, price, tag) VALUES (?, ?, ?, ?)';

  try {
    await db.execute(query, [name, image, price, tag]);
    res.status(201).send({ message: 'Product added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error when adding new product.' });
  }
});


const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await connectRedis(); // Bắt buộc: chờ kết nối Redis trước
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect Redis:', err);
    process.exit(1);
  }
})();