import React from 'react';
import './Css/Css.css';
import { useGlobalContext } from '../Context';

const Order = () => {
    const { getTotalAmount } = useGlobalContext()
    return (
        <div className="order">
            <div className="order_con">
                <div className="two_col">
                    <h3>Delivery Information</h3>
                    <form>
                        <input type="text" name="" id="" placeholder='First name' />
                        <input type="text" name="" id="" placeholder='Last name' />
                        <input type="email" name="" id="" placeholder='Email' />
                        <input type="text" name="" id="" placeholder='City' />
                        <input type="text" name="" id="" placeholder='Street' />
                        <input type="text" name="" id="" placeholder='Zip code' />
                        <input type="tel" name="" id="" placeholder='Phone' />
                        
                    </form>
                </div>
                <div className="two_col cart">
                    <h3>Cart Totals</h3>
                    <div>Subtotal <h4>${getTotalAmount()}</h4></div>
                    <div>Delivery fees <h4>$20</h4></div>
                    <div>Total <h4>${getTotalAmount() + 20}</h4></div>
                    <button>Procced to checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Order
