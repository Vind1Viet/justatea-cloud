import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import productsRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoute.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

// Mount routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("JustaTea E-commerce API is running 🚀");
});

// Listen on specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});