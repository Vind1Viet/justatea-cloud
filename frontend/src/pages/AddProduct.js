import React, { useState } from 'react';
import './css/AddProduct.css';
import menu_category from '../components/assets/Category';

const AddProduct = () => {
  const cloudfrontDomain = "https://d123abc.cloudfront.net";

  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    tag: 'Tea', // Initialize category as an empty string
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
    e.preventDefault();

    try {
      const cloudfrontDomain = "https://d123abc.cloudfront.net";
      const imageUrl = `${cloudfrontDomain}/products/${productInfo.name}.png`;

      // // 2. Gửi ảnh lên Lambda
      // const formData = new FormData();
      // formData.append("file", productInfo.image);
      // formData.append("productName", productInfo.name); // để Lambda đặt đúng tên ảnh

      // const uploadRes = await fetch("https://your-api-gateway.amazonaws.com/resize", {
      //   method: "POST",
      //   body: formData,
      // });

      // 2. Gửi thông tin sản phẩm về backend Node.js/Express
      const productData = {
        name: productInfo.name,
        image: imageUrl,
        price: productInfo.price,
        tag: productInfo.tag,
      };

      const res = await fetch('http://localhost:5000/products', {
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
          image: null,
          price: '',
          tag: 'Tea',
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
              name="tag"
              className='add-product-selector'
              value={productInfo.tag}
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