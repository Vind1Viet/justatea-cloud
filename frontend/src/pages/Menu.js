// src/pages/Menu.js
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Item from '../components/item/Item.js';
import './css/Menu.css';
import banner from '../components/assets/banner.jpg';
import menu_category from '../components/assets/Category.js';
import { ProductContext } from '../contexts/ProductContext';

const Menu = () => {
  const { products, loading } = useContext(ProductContext); // lấy data từ context
  console.log(products)

  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  const location = useLocation();

  // Lấy query từ URL (?query=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || "";
    setSearchQuery(query.toLowerCase());
  }, [location.search]);

  // Xử lý filter theo giá
  const filterByPrice = (item) => {
    if (priceFilter === "all") return true;
    if (priceFilter === "below20") return item.price < 30000;
    if (priceFilter === "20to50") return item.price >= 30000 && item.price <= 40000;
    if (priceFilter === "above50") return item.price > 40000;
    return false;
  };

  // Lọc sản phẩm theo category, search và price
  const filteredProducts = products.filter(item =>
    (category === "All" || item.category === category) &&
    filterByPrice(item) &&
    item.name.toLowerCase().includes(searchQuery)
  );

  // Sort sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className='menu'>
      <img className='banner' src={banner} alt=""/>
      <h1 className='menu-header'>Thực đơn</h1>

      {/* Sort + Filter */}
      <div className='filter-sort'>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className='sort-dropdown'>
          <option value="default">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter} className='filter-dropdown'>
          <option value="all">All Prices</option>
          <option value="below20">Dưới 30000</option>
          <option value="20to50">30000 - 40000</option>
          <option value="above50">Trên 40000</option>
        </select>
      </div>

      {/* Category */}
      <div className='category'>
        {menu_category.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.category_name ? "All" : item.category_name)}
            key={index}
            className='category-item'
          >
            <img className={category === item.category_name ? "active" : ""} src={item.category_image} alt="" />
            <p>{item.category_name}</p>
          </div>
        ))}
      </div>

      <hr />

      {/* Hiển thị danh sách sản phẩm */}
      <div className='menu-items'>
        {loading ? (
          <p>Loading products...</p>
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.image_url} price={item.price} stock={item.stock} />
          ))
        ) : (
          <p>No products found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Menu;
