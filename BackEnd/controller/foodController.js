import { foodModel } from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req,res) =>{
    let file_name = `${req.file.filename}`
    try {
        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:file_name
        });

        food.save();
        res.status(200).json({message:"Food added successful",
            data: food
        })
    } catch (error) {
        res.status(500).json({
            message:"Unable to add Food",
            error:error.message
        })
    }
};

const foodList = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({message:true, data:foods});
    } catch (error) {
        res.json({succcess:false, message:error});
    }
}

const removeFood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({success:false, message:"unable to find Food"});
        }
        
        fs.unlink(`upload/${food.image}`, ()=>{});
    
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true, message:"Food removed successful"})
    } catch (error) {
        res.status(500).json({success:false, message:"unable to remove Food", error:error.message})
    }
};


export {addFood,foodList,removeFood}