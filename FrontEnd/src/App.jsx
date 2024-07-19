import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Shop from './Component/Pages/Shop'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './Component/Pages/Cart'
import Login from './Component/Pages/Login'
import Order from './Component/Pages/Order'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/order' element={<Order/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
