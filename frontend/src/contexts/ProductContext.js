import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }; 
        fetchProducts();
    }, []);

    const AddProduct = async (newProduct) => {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            setProducts((prevProducts) => [...prevProducts, data]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const RemoveProduct = async (productId) => {
        try {
            await fetch(`http://localhost:5000/api/products/${productId}`, {        
                method: 'DELETE',
            });
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, AddProduct, RemoveProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
