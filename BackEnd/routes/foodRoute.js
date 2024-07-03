import express from 'express';
import multer from 'multer';
import { addFood,foodList,removeFood } from '../controller/foodController.js';

export const foodRouter = express.Router();

//Storage engine
const storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({storage:storage});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/foods", foodList);
foodRouter.post("/remove", removeFood);