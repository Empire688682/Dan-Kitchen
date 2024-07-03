import { UserModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import validator from "validator";

//login user
const registerUser = async (req, res) =>{
    const {name, password, email} = req.body;
    try {
        // checking isUser exist
        const userExist = await UserModel.findOne({email});
        if(userExist){
            return res.json({success:false, message:"user already exist"})
        }
        // checking isEmail valid
        const isEmailValid = (!validator.isEmail(email));
        if(isEmailValid){
            return res.json({success:false, message:"please enter valid email"})
        }
        // checking password strenght
        const isPasswordStrong = password.length >= 8;
        if(!isPasswordStrong){
            return res.json({success:false, message:"password must be graeter than 8"})
        }

        const newUser = new UserModel({
            name:name,
            email:email,
            password:password
        });
       
        const user = await newUser.save();
        return res.json({ success: true, message: "User registered successfully", user });

    } catch (error) {
        console.log("CreatingUser:", error);
        res.json({success:false, message:"Error"})
    }
};

//register user
const loginUser = async (req, res) =>{
    const {email, password} = req.body

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not exist"})
        };

        const isPassword = 

    } catch (error) {
        
    }
};

export {loginUser, registerUser};

