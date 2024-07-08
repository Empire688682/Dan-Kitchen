import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true}
});

export const userModel = mongoose.models.User || mongoose.model("User", userSchema);