import React, { useState } from 'react';
import './css/AddProduct.css';
import menu_category from '../components/assets/Category';

const AddProduct = () => {
  const cloudfrontDomain = "https://d123abc.cloudfront.net";

  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    category: 'Tea', // Initialize category as an empty string
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProductInfo({ ...productInfo, image: files[0] });
    } else {
      setProductInfo({ ...productInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(productInfo);
    e.preventDefault();

    try {
      const cloudfrontDomain = "https://d123abc.cloudfront.net";
      const imageUrl = `${cloudfrontDomain}/products/${productInfo.name}.png`;

      // 2. Gửi ảnh lên Lambda
      const formData = new FormData();
      formData.append("file", productInfo.image);
      formData.append("productName", productInfo.name); // để Lambda đặt đúng tên ảnh

      const uploadRes = await fetch("https://your-api-gateway.amazonaws.com/resize", {
        method: "POST",
        body: formData,
      });

      // 2. Gửi thông tin sản phẩm về backend Node.js/Express
      const productData = {
        name: productInfo.name,
        price: productInfo.price,
        category: productInfo.category,
        image: imageUrl,
      };

      const res = await fetch('http://your-backend-api-url/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert('Thêm sản phẩm thành công!');
        console.log('Product added successfully:', productData);
        setProductInfo({
          name: '',
          price: '',
          category: 'Tea',
          image: null,
        });
      } else {
        alert('Lỗi khi thêm sản phẩm!');
      }

    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <div className='add-product'>
      <div className='add-product-container'>
        <h1>Thêm sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className='add-product-fields'>
            <p>Tên sản phẩm</p>
            <input
              type="text"
              name="name"
              placeholder='Nhập'
              value={productInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className='add-product-fields'>
            <p>Giá sản phẩm</p>
            <input
              type="text"
              name="price"
              placeholder='Giá'
              value={productInfo.price}
              onChange={handleChange}
            />
          </div>
          <div className='add-product-fields'>
            <p>Loại sản phẩm</p>
            <select
              name="category"
              className='add-product-selector'
              value={productInfo.category}
              onChange={handleChange}
            >
              {menu_category.map((item,index)=>{
              return(
                <option value={item.category_name} key={index}>{item.category_name}</option>
              )
              })}
            </select>
          </div>
          <div className='add-product-fields'> 
            <p>Hình ảnh</p>
            <div className='add-product-image'>
                <label htmlFor='file-input'>
                    <img src={productInfo.image?URL.createObjectURL(productInfo.image):"https://static.thenounproject.com/png/187803-200.png"} alt=""></img>
                </label>
                <input onChange={handleChange} type="file" name="image" id="file-input" hidden/>
            </div>
        </div>
          <button 
            type="submit"
            className={productInfo.name && productInfo.price && productInfo.image? "active":""}
            disabled={!productInfo.name || !productInfo.price || !productInfo.image}
          >Thêm sản phẩm</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;