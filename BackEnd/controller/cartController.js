import { userModel } from "../models/userModel.js";

//add items to user cart
const addToCart = async (req,res) =>{
    try {
        //checking if user exist
        let userData = await userModel.findById(req.body.userId);

        if(!userData){
            return res.json({success:false, message:"User not found"})
        }

        // calling userData cartData to variable
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        };

        console.log(cartData);

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success:true, message:"Item added to cart"})

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error adding item to cart' });
    }
}

//remove items from user cart
const removeFromCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // remove item from cart
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        };
        console.log(cartData);
        //updating cartData
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Item remove from cart"});
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error removing item to cart' });
    }
}

// fetch items from user cart
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        return res.json({ success: false, cartData, message: 'Cart data fetch successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error removing item to cart' });
    }
}

export {addToCart,removeFromCart,getCart}