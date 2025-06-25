import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/productdisplay/ProductDisplay.js'
const Product = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log("Fetching product with ID:");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
        <ProductDisplay product={product}/>
        {/* <DescriptionBox/> */}
    </div>
  );
};

export default Product;
