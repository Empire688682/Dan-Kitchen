import React, { useState } from 'react'
import './Css/Css.css';
import cross_Icon from '../Asset/cross_icon.png'
import { useGlobalContext } from '../Context';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [stage, setStage]= useState("signup");
  const {display, setDisplay} = useGlobalContext();
  return (
    <div className='login'>
      <div className="login_content">
      <NavLink to="/" className='cross_icon'><img onClick={()=>setDisplay(false)} src={cross_Icon} alt=""/></NavLink>
        {
          stage && stage === "signup"? <form>
          <h1>SignUp</h1>
          <input name='name' type="text" placeholder='Enter your name' />
          <input name='email' type="email" placeholder='Enter your email' />
          <input name='password' type="password" placeholder='Enter your password' />
          <button type="submit">Register</button>
          <p>Already have an account <small style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={()=> setStage("login")}>Login</small></p>
        </form>:<form>
          <h1>Login</h1>
          <input name='email' type="email" placeholder='Enter your email' />
          <input name='password' type="password" placeholder='Enter your password' />
          <button type="submit">Login</button>
          <p>Dont have an account <small style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={()=> setStage("signup")}>Signup</small></p>
        </form>
        }
      </div>
    </div>
  )
}

export default Login
