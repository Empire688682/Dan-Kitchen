import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ShopContext = React.createContext();

export const ShopProvider = ({children}) =>{

    const [cartItem, setCartItem] = useState({});
    const [food_list, setFood_list] = useState([])
    const [token, setToken] = useState("");
    const url = "http://localhost:1999";

    useEffect(()=>{
        localStorage.getItem("token");
        setToken(localStorage.getItem("token"))
        const getAllFoods = async () =>{
            try {
                const response = await axios.get(`${url}/Api/food/foods`);
                setFood_list(response.data.data)
            } catch (error) {
                console.log(error)
            }
        };
        getAllFoods();
    },[])

    const addToCart = (itemId) =>{
        setCartItem((prev) =>{
            if(!prev[itemId]){
                return{...prev, [itemId]:1}
            }
            else{
                return{...prev, [itemId]:prev[itemId]+1}
            }
        })
    }

    const removeFromCart = (itemId) =>{
        setCartItem((prev) =>({...prev, [itemId]:(prev[itemId]-1)}))
    }

    const getTotalAmount = () =>{
        let total = 0;
        for(const item in cartItem){
            if(cartItem[item]> 0){
             let totalInfo = food_list.find((product) => product._id === item);
             total += totalInfo.price * cartItem[item]
            }
        }
        return total
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
