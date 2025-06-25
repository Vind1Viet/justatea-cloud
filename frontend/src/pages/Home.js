import React, { useContext, useEffect, useState } from 'react'
import './css/Home.css'
import { Link } from 'react-router-dom'
import poster from '../components/assets/poster.png';
const BestProduct = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
  return (
    <div className='home'>
        <div className='poster'>
            <img src={poster}
            alt=""></img>
            <div className='poster-text'>
                <h2>Chào mừng đến JustaTea</h2>
                <p>Bạn đang tìm kiếm khoảnh khắc bình yên?</p>
                <p>JustaTea là nơi nghỉ ngơi ấm cúng của bạn. 
                    Chúng tôi là nơi mà hương thơm tinh tế của 
                    cà phê và trà hòa quyện nhau tạo nên bầu không khí thực sự đặc biệt, mang cho bạn một cảm giác ấm cúng và thư giãn.</p>
                <p>Cho dù bạn là người sành trà hay sành cà phê, 
                    chúng tôi đều có thứ gì đó có thế làm hài lòng vị giác của bạn. 
                    Thực đơn của chúng tôi có nhiều loại trà được lựa chọn cẩn thận và các loại cà phê pha chế chuyên nghiệp, 
                    tất cả đều được làm bằng niềm đam mê và sự chăm chút.</p>
                <p>Tại JustaTea, đó không chỉ là một thức uống; đó là một trải nghiệm.</p>
                <Link onClick={handleClick} style={{ color: '#f6edd9', textDecoration: 'none', border: 'none' }} to="/Menu">
                <button >Khám phá thực đơn của chúng tôi</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default BestProduct