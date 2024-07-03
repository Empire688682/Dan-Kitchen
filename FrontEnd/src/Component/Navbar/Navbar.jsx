import React, { useState } from 'react'
import Search_Icon from '../Asset/search_icon.png';
import Cart_Icon from '../Asset/basket_icon.png';
import './Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("Home");
  return (
    <div className='navbar'>
      <h1 className='logo'>Dan Kitchen.</h1>
      <div className="menu">
        <ul>
            <li onClick={() => setMenu("Home")}>Home {menu==='Home'?<hr/>:<></>}</li>
            <li onClick={() => setMenu("Menu")}>Menu {menu==='Menu'?<hr/>:<></>}</li>
            <li onClick={() => setMenu("Mobile")}>Mobile{menu==='Mobile'?<hr/>:<></>}</li>
            <li onClick={() => setMenu("Contact")}>Contact Us {menu==='Contact'?<hr/>:<></>}</li>
        </ul>
      </div>
      <div className="login-section">
        <img src={Search_Icon} />
        <NavLink to='/cart'><img src={Cart_Icon} /></NavLink>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Navbar
