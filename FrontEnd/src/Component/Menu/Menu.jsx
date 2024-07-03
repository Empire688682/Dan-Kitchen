import React from 'react'
import './Menu.css';
import { menu_list } from '../Asset/assets';

const Menu = ({category, setCategory}) => {
  return (
    <div className='cart-menu'>
      <div className="menu-con">
      {
        menu_list.map((item, i) =>{
            return (<div className='menu-cart' key={i}>
                <img src={item.menu_image} onClick={()=> setCategory((prev)=>(prev !== item.menu_name? item.menu_name:"All"))} className={item.menu_name === category? "active":''}/>
                <h3>{item.menu_name}</h3>
            </div>)
        })
      }
      </div>
    </div>
  )
}

export default Menu
