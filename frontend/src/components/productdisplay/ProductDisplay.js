import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import alt_img from '../assets/alt_img.png'; // Placeholder image if product image fails to load

const ProductDisplay = () => {
  const productID = window.location.pathname.split('/').pop(); // Get productID from URL
  const [product, setProduct] = useState([]);
  const [selectedSize, setSelectedSize] = useState('Vừa');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!productID) console.log('No product ID found'); // tránh fetch khi ID chưa có

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://13.250.107.161:5000/products/${productID}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Fetched product:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [productID]);

  useEffect(() => {
    if (product && product.price != null) {
      setPrice(Number(product.price));
    }
  }, [product]);

  useEffect(() => {
    // Update price when product changes
    setPrice(Number(product.price));
  }, [product]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    updatePrice(size, selectedToppings);
  };

  const handleToppingSelection = (topping) => {
    const newToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter((t) => t !== topping)
      : [...selectedToppings, topping];

    setSelectedToppings(newToppings);
    updatePrice(selectedSize, newToppings);
  };

  const updatePrice = (size, toppings) => {
    let newPrice = Number(product.price);
    if (size === 'Lớn') {
      newPrice += 5000;
    }
    newPrice += toppings.length * 5000;
    setPrice(newPrice);
  };

  return (
    (product === null) ? (
      <div className='loading'>Loading...</div> ):(
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img'>
          <img src={product.img} alt={alt_img} />
        </div>
      </div>
      <div className='productdisplay-right'>
        <div className='product-info'>
          <h1>{product.name}</h1>
          <div className='product-price'>{price.toLocaleString()}đ</div>
        </div>
        <div className='choose-size'>
          <p>Chọn size</p>
          <div className='size-option'>
            <div
              className={`size ${selectedSize === 'Vừa' ? 'selected' : ''}`}
              onClick={() => handleSizeSelection('Vừa')}
            >
              <div>Vừa +0đ</div>
            </div>
            <div
              className={`size ${selectedSize === 'Lớn' ? 'selected' : ''}`}
              onClick={() => handleSizeSelection('Lớn')}
            >
              <div>Lớn +5000đ</div>
            </div>
          </div>
        </div>
        {product.tag!="Food"?(
        <div className='choose-topping'>
          <p>Chọn topping</p>
          <div className='topping-option'>
            <div
              className={`topping ${selectedToppings.includes('Trân châu') ? 'selected' : ''}`}
              onClick={() => handleToppingSelection('Trân châu')}
            >
              <div>Trân châu + 5000đ</div>
            </div>
            <div
              className={`topping ${selectedToppings.includes('Caramel') ? 'selected' : ''}`}
              onClick={() => handleToppingSelection('Caramel')}
            >
              <div>Sốt Caramel + 5000đ</div>
            </div>
            <div
              className={`topping ${selectedToppings.includes('Kem') ? 'selected' : ''}`}
              onClick={() => handleToppingSelection('Kem')}
            >
              <div>Kem Cheese + 5000đ</div>
            </div>
          </div>
        </div>):(<div></div>)}
        <p>Thành phần chính: {product.description}</p>
        <button>Thêm vào giỏ hàng</button>
      </div>
    </div>)
  );
};

export default ProductDisplay;
