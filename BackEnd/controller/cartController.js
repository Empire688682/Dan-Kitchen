import { userModel } from "../models/userModel.js";

//add items to user cart
const addToCart = async (req,res) =>{
    try {
        let userData = userModel.findOne({_id:req.body.userId});
        
    } catch (error) {
        
    }
}

//remove items from user cart
const removeFromCart = async (req,res) =>{
    
}

// fetch items from user cart
const getCart = async (req,res) =>{
    
}

export {addToCart,removeFromCart,getCart}