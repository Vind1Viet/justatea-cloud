import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState('home');
  const navRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <ul className="nav-menu" ref={navRef}>
        <li className="nav-logo">
          <Link to="/" style={{ textDecoration: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="JustaTea Logo" className="nav-logo-img" />
            <p>JustaTea</p>
          </Link>
        </li>
        <li>
          <Link to="/" className="navbar-link">Trang chủ</Link>
          {location.pathname === '/' ? <hr/>:<></>}
        </li>
        <li>
          <Link to="/Menu" className="navbar-link">Thực đơn</Link>
          {location.pathname === '/Menu' ? <hr/>:<></>}
        </li>
        <li>
          <Link to="/About" className="navbar-link">Về chúng tôi</Link>
          {location.pathname === '/About' ? <hr/>:<></>}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
