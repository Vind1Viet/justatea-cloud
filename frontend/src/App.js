import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import About from './pages/About';
import './App.css';
import ProductDisplay from './components/productdisplay/ProductDisplay';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Menu/:productID' element={<ProductDisplay/>} />
          <Route path='/About' element={<About/> } />
          <Route path='/AddProduct' element={<AddProduct />} />
          {/* Add more routes as needed */} 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
