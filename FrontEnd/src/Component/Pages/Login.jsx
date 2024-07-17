import React, { useState } from 'react'
import './Css/Css.css';
import cross_Icon from '../Asset/cross_icon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../Context';


const Login = () => {
  const {setToken, url} = useGlobalContext();
  const [stage, setStage] = useState("signup");
  const useNav = useNavigate();
  
  const returnHome = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useNav("/");
  }
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(null);
  const [classe, setClasse] = useState(null);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    try {
      const user = await axios.post(`${url}/Api/user/register`, data);
      if (user.data.success === true) {
        setData({
          name: "",
          email: "",
          password: ""
        });
        setMessage(user.data.message);
        setClasse("true");
      }
      else {
        setMessage(user.data.message);
        setClasse("false");
      }
      return user;
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = async () => {
    try {
      const user = await axios.post(`${url}/Api/user/login`, data);
      if (user.data.success === true) {
        setData({
          name: "",
          email: "",
          password: ""
        });
        setMessage(user.data.message);
        setToken(user.data.token);
        setClasse("true");
        localStorage.setItem("token", user.data.token);
        returnHome()
      }
      else {
        setMessage(user.data.message);
        setClasse("false");
        setData({
          name: "",
          email: "",
          password: ""
        });
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  const signFormHandler = (e) => {
    e.preventDefault();
    createUser();
    setMessage(null);
  }

  const loginFormHandler = (e) => {
    e.preventDefault();
    loginUser();
    setMessage(null);
  }

  const loginClick = () => {
    setStage("login");
    setData({
      name: "",
      email: "",
      password: ""
    })
  };

  const signupClick = () => {
    setStage("signup");
    setData({
      name: "",
      email: "",
      password: ""
    })
  };

  return (
    <div className='login'>
      <div className="login_content">
        <NavLink to="/" className='cross_icon'><img src={cross_Icon} alt="" /></NavLink>
        {
          stage && stage === "signup" ? <form onSubmit={signFormHandler}>
            <h1>SignIn</h1>
            <input required value={data.name} onChange={handleOnchange} name='name' type="text" placeholder='Enter your name' />
            <input required value={data.email} onChange={handleOnchange} name='email' type="email" placeholder='Enter your email' />
            <input required value={data.password} onChange={handleOnchange} name='password' type="password" placeholder='Enter your password' />
            <button type="submit">Register</button>
            <small className={classe === "true" ? "true" : "false"}>{message}</small>
            <p>Already have an account <small style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={loginClick}>Login</small></p>
          </form> : <form onSubmit={loginFormHandler}>
            <h1>Login</h1>
            <input required value={data.email} onChange={handleOnchange} name='email' type="email" placeholder='Enter your email' />
            <input required value={data.password} onChange={handleOnchange} name='password' type="password" placeholder='Enter your password' />
            <button type="submit">Login</button>
            <small className={classe === "true" ? "true" : "false"}>{message}</small>
            <p>Dont have an account <small style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={signupClick}>Signup</small></p>
          </form>
        }
      </div>
    </div>
  )
}

export default Login
