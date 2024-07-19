import React from 'react'
import { useGlobalContext } from '../Context'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  const { getTotalAmount, cartItem, food_list, url,removeFromCart } = useGlobalContext()
  return (
    <div className='cart_Item'>
      <div className="header">
        <div className="image">Image</div>
        <div className="name">Name</div>
        <div className="category">Category</div>
        <div className="quantity">Quantity</div>
        <div className="price">Price</div>
        <div className="remove">Remove</div>
      </div>
      {
        food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return <div className="content" key={item._id}>
              <div className="image">
                <img src={`${url}/images/${item.image}`} alt="" />
              </div>
              <div className="name">{item.name}

              </div>
              <div className="category">{item.category}</div>
              <div className="quantity">{cartItem[item._id]}</div>
              <div className="price">${item.price}</div>
              <div className="remove" onClick={() => removeFromCart(item._id)}>X</div>
            </div>
          }
        })
      }
       <div className="cart_total_promo_code">
        <div className="two_col cart">
          <h2>Cart Total</h2>
          <div>Subtotal <h4>${getTotalAmount()}</h4></div>
          <div>Delivery fees <h4>$20</h4></div>
          <div>Total <h4>${getTotalAmount() + 20}</h4></div>
          <button><NavLink to="/order" style={{textDecoration:"none", color:"white"}}>Procced to checkout</NavLink></button>
        </div>
        <div className="two_col form">
          <h5>If you have a promo code enter it here</h5>
          <form>
            <input type="text" name="" id="" placeholder='Your code' />
            <button type="submit">Submit</button>
          </form>
        </div>
       </div>
    </div>
  )
}

export default Cart

