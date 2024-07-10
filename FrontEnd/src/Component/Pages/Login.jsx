import React, { useState } from 'react'
import './Css/Css.css';
import cross_Icon from '../Asset/cross_icon.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [stage, setStage]= useState("signup");
  const url =  "http://localhost:1999"
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const formHandler = (e) =>{
    e.preventDefault();
  }

  const handleOnchange = (e) =>{
    const {name, value} = e.target;
    setData((prev) =>({...prev, [name]:value}))
  };

  const createUser = async () =>{
    try {
      const user = await axios.post(`${url}/Api/user/register`, data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login'>
      <div className="login_content">
      <NavLink to="/" className='cross_icon'><img src={cross_Icon} alt=""/></NavLink>
        {
          stage && stage === "signup"? <form onSubmit={formHandler}>
          <h1>SignUp</h1>
          <input required value={data.name} onChange={handleOnchange} name='name' type="text" placeholder='Enter your name' />
          <input required value={data.email} onChange={handleOnchange} name='email' type="email" placeholder='Enter your email' />
          <input required value={data.password} onChange={handleOnchange} name='password' type="password" placeholder='Enter your password' />
          <button type="submit">Register</button>
          <p>Already have an account <small style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={()=> setStage("login")}>Login</small></p>
        </form>:<form onSubmit={formHandler}>
          <h1>Login</h1>
          <input required value={data.email} onChange={handleOnchange} name='email' type="email" placeholder='Enter your email' />
          <input required value={data.password} onChange={handleOnchange} name='password' type="password" placeholder='Enter your password' />
          <button type="submit">Login</button>
          <p>Dont have an account <small style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={()=> setStage("signup")}>Signup</small></p>
        </form>
        }
      </div>
    </div>
  )
}

export default Login
