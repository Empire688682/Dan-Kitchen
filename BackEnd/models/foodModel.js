import mongoose from "mongoose";

export const foodSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:String, required:true}
});

export const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);