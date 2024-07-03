import { userModel } from "../models/userModel.js";

const creatUser = async (req, res) =>{
    try {
        const user = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });

        user.save();
        res.status(200).json({message:"User created successfully", data:user});
        console.log(user)
    } catch (error) {
        res.status(500).json({message:"Failed to create User", error:error})
    }
}

export{creatUser}
