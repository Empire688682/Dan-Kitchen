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

    const addToCart = async (itemId) =>{
        if(!cartItem[itemId]){
            setCartItem((prev)=> ({...prev, [itemId]:1}))
        }
        else{
            setCartItem((prev)=> ({...prev, [itemId]:prev[itemId] + 1}))
        }
        
        if (token){
            try {
                const response = await axios.post(url+"/Api/user/add", {itemId}, {headers:{token}});
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    console.log(token)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk3ZmQ2OTUyYTgwMWUwZTZlMWJmMmEiLCJpYXQiOjE3MjEzMTQxNDF9.ePfiFQzWZHb28g6Ltd3teQLcpboRQI_-kWV0EGNNHKI

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
