import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ShopContext = React.createContext();

export const ShopProvider = ({children}) =>{

    const [cartItem, setCartItem] = useState({});
    const [food_list, setFood_list] = useState([])
    const [token, setToken] = useState("");
    const url = "http://localhost:1999";

    const loadCartData = async (token) =>{
        try {
            const response = await axios.post(url+"/Api/cart/get", {}, {headers:{token}});
            setCartItem(response.data.cartData)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        localStorage.getItem("token");
        loadCartData(localStorage.getItem("token"))
        setToken(localStorage.getItem("token"));
        const getAllFoods = async () =>{
            try {
                const response = await axios.get(`${url}/Api/food/foods`);
                setFood_list(response.data.data)
            } catch (error) {
                console.log(error)
            }
        };
        getAllFoods();
    },[]);
    

    const addToCart = async (itemId) =>{
        if(!cartItem[itemId]){
            setCartItem((prev)=> ({...prev, [itemId]:1}))
        }
        else{
            setCartItem((prev)=> ({...prev, [itemId]:prev[itemId] + 1}))
        }
        
        if (token){
            try {
                await axios.post(url+"/Api/cart/add", {itemId}, {headers:{token}});
            } catch (error) {
                console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
            }
        }
        else {
            console.warn('No token available. User not authenticated.');
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItem((prev) =>({...prev, [itemId]:(prev[itemId]-1)}))
        if(token){
            try {
                const response = await axios.post(url+"/Api/cart/remove", {itemId}, {headers:{token}});
                console.log(response.data)
            } catch (error) {
                console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
            }
        }else{
            console.log('No token available. User not authenticated.');
        }
    }

    const getTotalAmount = () =>{
        let total = 0;
        for(const item in cartItem){
            if(cartItem[item]> 0){
             let totalInfo = food_list.find((product) => product._id === item);
             total += totalInfo.price * cartItem[item]
            }
        }
        return total;
        
    }
    

    return <ShopContext.Provider value={
        {getTotalAmount,
        removeFromCart,
        cartItem,
        addToCart,
        food_list,
        url,
        token, 
        setToken
        }}>
        {children}
    </ShopContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(ShopContext);
}
