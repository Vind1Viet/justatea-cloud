import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

// Import routes
import productsRoutes from './routes/productRoutes.js';

// Mount routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("JustaTea E-commerce API is running 🚀");
});

// Listen on specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});