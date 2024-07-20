import React, { useState } from 'react'
import './ShopItem.css'
import star_Icon from'../Asset/rating_starts.png'
import add_Icon_White from '../Asset/add_icon_white.png'
import add_Icon_Green from '../Asset/add_icon_green.png'
import remove_Icon_Red from '../Asset/remove_icon_red.png'
import { useGlobalContext } from '../Context'

const ShopItem = ({name,id,price,image,description}) => {
  const {removeFromCart,cartItem,addToCart,url} = useGlobalContext()
  return (
    <div className='shop-item'>
      <img className='shop-item-img' src={url+"/images/"+image}/>
      <div className="count-section">
        {
          !cartItem[id]? <div className=''>
            <img src={add_Icon_White} onClick={()=>addToCart(id)}/>
          </div>:<div className='count-control-con'>
            <img src={add_Icon_Green} onClick={()=>addToCart(id)}/>
            <p>{cartItem[id]}</p>
            <img src={remove_Icon_Red} onClick={()=>removeFromCart(id)}/>
          </div>
        }
      </div>
      <div className="name-section">
        <h3>{name}</h3>
        <img src={star_Icon} />
      </div>
      <p>{description}</p>
      <p className='price'>${price}</p>
    </div>
  )
}

export default ShopItem
