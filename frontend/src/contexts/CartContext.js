import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const uid = auth?.userId || null;
    const token = auth?.accessToken || localStorage.getItem("token");

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cart khi user login
    useEffect(() => {
        const fetchCart = async () => {
            if (!uid || !token) {
                setCartItems([]);
                setLoading(false);
                return;
            }
            try {
                const res = await fetch("http://localhost:5000/api/cart", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                setCartItems(data.items || []);
            } catch (err) {
                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [uid, token]);

    // Add item
    const addItem = async (item) => {
        try {
            const res = await fetch("http://localhost:5000/api/cart/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(item)
            });
            const data = await res.json();
            setCartItems((prev) => [...prev, data]);
        } catch (err) {
            console.error("Error adding item:", err);
        }
    };

    // Update số lượng
    const updateQuantity = async (productId, size, newQuantity) => {
        try {
            await fetch("http://localhost:5000/api/cart/items/quantity", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId, size, quantity: newQuantity })
            });
            setCartItems((prev) =>
                prev.map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    // Remove item
    const removeItem = async (productId, size) => {
        try {
            await fetch("http://localhost:5000/api/cart/items", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId, size })
            });
            setCartItems((prev) =>
                prev.filter((item) => !(item.productId === productId && item.size === size))
            );
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    // Clear cart
    const clearCart = async () => {
        try {
            await fetch("http://localhost:5000/api/cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setCartItems([]);
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    return (
        <CartContext.Provider
            value={{ cartItems, loading, addItem, updateQuantity, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
