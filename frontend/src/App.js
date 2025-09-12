import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import About from './pages/About';
import './App.css';
import ProductDisplay from './components/productdisplay/ProductDisplay';
import AddProduct from './pages/AddProduct';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='Menu' element={<Menu />} />
              <Route path='Menu/:productID' element={<ProductDisplay />} />
              <Route path='About' element={<About />} />
              <Route path='AddProduct' element={<AddProduct />} />
              <Route path='Register' element={<Register />} />
              <Route path='Login' element={<Login />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
