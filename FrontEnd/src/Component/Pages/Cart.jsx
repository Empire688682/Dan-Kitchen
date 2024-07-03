import React from 'react'
import { useGlobalContext } from '../Context'

const Cart = () => {
  const {removeFromCart,getTotalAmount,cartItem,addToCart,food_list} = useGlobalContext()
  return (
    <div className='cart'>
      {
        food_list.map((item,i) =>{
          if(cartItem[item.id]>0 ){
            return <p key={i}>${cartItem[item.id] * item.price}</p>
          }
        })
      }
      <h1>${getTotalAmount()}</h1>
    </div>
  )
}

export default Cart
