import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from './pages/About';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Menu/:productID' element={<Product />} />
          <Route path='/About' element={<About/> } />
          {/* Add more routes as needed */} 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
