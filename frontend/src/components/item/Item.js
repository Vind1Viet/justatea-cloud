import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'
import alt_img from '../assets/alt_img.png'; // Placeholder image if product image fails to load

const Item = ({ id, name, image, price, tag, inStock }) => {
  return (
    
    <div className='item'>
      <Link style={{textDecoration: 'none'}} to ={`/Menu/${id}`}>
        <img src={image} alt = ""/>
        <div className='item-info'>
            <h>{name}</h>
            <p>{price}đ</p>
        </div>
      </Link>
    </div> 
  )
}

// const Item = ({ id, name, imageUrl, price, tag }) => {
//   return (
//     <div className='item'>
//       <img src={imageUrl} alt={name} className='item-image' />
//       <h3>{name}</h3>
//       <p>{price.toLocaleString()}đ</p>
//     </div>
//   );
// }
export default Item