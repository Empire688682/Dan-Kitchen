import React, { useContext, useState } from 'react'
import { food_list } from './Asset/assets';

const ShopContext = React.createContext();

export const ShopProvider = ({children}) =>{

    const [cartItem, setCartItem] = useState({});

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
             let totalInfo = food_list.find((product) => product.id === item);
             total += totalInfo.price * cartItem[item]
            }
        }
        return total
    }

    const [display, setDisplay]= useState(true);

    return <ShopContext.Provider value={{getTotalAmount,display,setDisplay,removeFromCart,cartItem,addToCart,food_list}}>
        {children}
    </ShopContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(ShopContext);
}
