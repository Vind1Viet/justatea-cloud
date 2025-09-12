import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import './ProductDisplay.css';
import alt_img from '../assets/alt_img.png'; // Placeholder image if product image fails to load

const ProductDisplay = () => {
  const { productID } = useParams(); // lấy productID từ URL
  const { products, loading } = useContext(ProductContext);

  const [selectedSize, setSelectedSize] = useState('Vừa');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [price, setPrice] = useState(0);

  // tìm sản phẩm từ context
  const product = products.find((p) => String(p.id) === String(productID));

  useEffect(() => {
    if (product && product.price != null) {
      setPrice(Number(product.price));
    }
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
    if (!product) return;
    let newPrice = Number(product.price);
    if (size === 'Lớn') {
      newPrice += 5000;
    }
    newPrice += toppings.length * 5000;
    setPrice(newPrice);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="not-found">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img'>
          <img src={product.image_url || alt_img} alt={product.name} />
        </div>
      </div>
      <div className='productdisplay-right'>
        <div className='product-info'>
          <h1>{product.name}</h1>
          <div className='product-price'>{price.toLocaleString()}đ</div>
        </div>

        {/* chọn size */}
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

        {/* chọn topping nếu không phải đồ ăn */}
        {product.category !== "Food" && (
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
          </div>
        )}

        <p>Thành phần chính: {product.description || "Đang cập nhật..."}</p>
        <button>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
