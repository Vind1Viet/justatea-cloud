import React, { useContext, useEffect } from 'react';
import './css/Cart.css';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, loading, updateQuantity, removeItem } = useContext(CartContext);
    const { products } = useContext(ProductContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.accessToken) {   // hoặc check auth.user / auth.role tùy cách bạn lưu
            navigate('/Login');
        }
    }, [auth, navigate]);


    const getProductInfo = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? { name: product.name, imageUrl: product.imageUrl } : null;
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = 15000;
    const finalPrice = totalPrice + shippingFee;

    if (loading) {
        return (
            <div className='empty-cart'>
                <h1>Đang lấy thông tin giỏ hàng...</h1>
                <img style={{ width: '200px', marginTop: "30px" }}
                     src="https://cdn-icons-png.freepik.com/512/8232/8232922.png" alt="loading" />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className='empty-cart'>
                <h1>Oops! Chưa có sản phẩm nào trong giỏ !</h1>
                <img src='https://i.pinimg.com/564x/47/07/f4/4707f4138db3ff7930a081dc17974fd8.jpg' alt="" />
                <p>Có vẻ như bạn đã quên thêm sản phẩm vào giỏ hàng.</p>
                <Link to="/Menu">
                    <button>Đặt món ngay</button>
                </Link>
            </div>
        );
    }

    return (
        <div className='cart-items'>
            <div className='cart-items-header'>
                <p>Sản phẩm</p>
                <p>Tên sản phẩm</p>
                <p>Kích cỡ</p>
                <p>Topping</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Tổng cộng</p>
                <p>Tùy chỉnh</p>
            </div>
            <hr />

            {cartItems.map((item, idx) => {
                const product = getProductInfo(item.productId);
                return (
                    <div className='cart-items-item cart-items-header' key={idx}>
                        <div className='cart-item-icon'>
                            <img src={product?.imageUrl || ''} alt={product?.name || 'Sản phẩm'} />
                        </div>
                        <p>{product?.name || 'N/A'}</p>
                        <p>{item.size}</p>
                        <p>{item.toppings?.join(', ') || 'Không'}</p>
                        <p>{item.price}đ</p>
                        <button className='cart-item-quanity'>{item.quantity}</button>
                        <p>{item.price * item.quantity}đ</p>
                        <div>
                            <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>+</button>
                            <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>-</button>
                            <button onClick={() => removeItem(item.productId, item.size)}>x</button>
                        </div>
                    </div>
                );
            })}

            <hr />
            <div className='cart-items-down'>
                <img src="https://i.pinimg.com/originals/b7/d5/99/b7d599e139a3eda7d5490245a136cb04.jpg" alt="Promotional" />
                <div className='cart-items-total'>
                    <h2>Tổng giá tiền</h2>
                    <div className='cart-items-total-price'>
                        <p>Tổng giá tiền sản phẩm</p>
                        <p>{totalPrice}đ</p>
                    </div>
                    <div className='cart-items-total-price'>
                        <p>Phí giao hàng</p>
                        <p>{shippingFee}đ</p>
                    </div>
                    <div className='cart-items-total-price'>
                        <p>Đơn giá</p>
                        <p>{finalPrice}đ</p>
                    </div>
                    <Link to='/Checkout' style={{ textDecoration: 'none' }}>
                    <button>Đi đến mục thanh toán</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
