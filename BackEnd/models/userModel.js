import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    cartData:{type:Object, default:{}}
},{minimize:false});

export const userModel = mongoose.models.User || mongoose.model("User", userSchema);