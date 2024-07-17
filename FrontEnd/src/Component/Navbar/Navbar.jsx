import React, { useState } from 'react'
import Search_Icon from '../Asset/search_icon.png';
import Cart_Icon from '../Asset/basket_icon.png';
import './Navbar.css'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../Context';
import user_Icon from '../Asset/profile_icon.png';
import bag_Icon from '../Asset/bag_icon.png';
import logout_Icon from '../Asset/logout_icon.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("Home");
    const {token, setToken} = useGlobalContext();
    const useNav = useNavigate()

    const logOutUser = () =>{
      localStorage.clear("token");
      setToken(localStorage.getItem("token"))
      useNav("/");
    }
  return (
    <div className='navbar'>
      <h1 className='logo'>Dan Kitchen.</h1>
      <div className="menu">
        <ul>
            <li><NavLink to="/" style={{textDecoration:"none", color: "rgb(73, 70, 70)"}} onClick={() => setMenu("Home")}>Home {menu==='Home'?<hr/>:<></>}</NavLink></li>
            <li  onClick={() => setMenu("Menu")}>Menu {menu==='Menu'?<hr/>:<></>}</li>
            <li onClick={() => setMenu("Mobile")}>Mobile{menu==='Mobile'?<hr/>:<></>}</li>
            <li onClick={() => setMenu("Contact")}>Contact Us {menu==='Contact'?<hr/>:<></>}</li>
        </ul>
      </div>
      <div className="login-section">
        <img src={Search_Icon} />
        <NavLink to='/cart'><img src={Cart_Icon} /></NavLink>
        {
          token? <div className="user_profile">
            <img src={user_Icon} alt="IMG"/>
            <ul>
              <li><img src={bag_Icon} alt="Img"/><p>Order</p></li>
              <li onClick={logOutUser}><img src={logout_Icon} alt="Img"/><p>Logout</p></li>
            </ul>
          </div>:
          <NavLink to='/login'><button>SignUp</button></NavLink>
        }
      </div>
    </div>
  )
}

export default Navbar
