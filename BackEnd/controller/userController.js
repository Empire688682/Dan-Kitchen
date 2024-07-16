import { userModel } from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const createToken = (userId) =>{
    return jwt.sign({userId}, process.env.SECRET_KEY)
}


const registerUser = async (req,res) =>{
    const {name, password, email} = req.body;
    try {

        //checking isUser exist
        const userExist = await userModel.findOne({email});
        if(userExist){
          return res.json({success:false, message:'User already exist'});
        }
        //checking isEmail valid
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Please enter a valid email'});
        }
         //checking isPassword strong
         if(!password.length >= 8){
            return res.json({success:false, message:'Please enter a Strong password'});
         }

         const hashedPassword = await bcrypt.hash(password, 14)

          // Creating and saving the new user
         const user = await new userModel({
            name:name,
            password:hashedPassword,
            email:email
        });

        createToken(user._id)

        await user.save();
         return res.json({success:true, message:'User registered'});
         
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}

const logInUser = async (req,res) =>{
    const {password, email} = req.body;
    try {
         //checking isUser exist
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'Invalid email or user'});
          }
          //checking isPassword s
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.json({success:false, message:'Wrong password'});
        }

        const token =createToken(user._id)
        return res.json({success:true, token, message:"Login successful"});

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export  {registerUser,logInUser}
