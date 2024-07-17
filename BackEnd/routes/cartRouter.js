import express from 'express';
import { addToCart,removeFromCart,getCart } from '../controller/cartController.js'
import authMiddleware from '../middleware/auth.js';

const cartRoute = express.Router();

cartRoute.post("/add",authMiddleware, addToCart);
cartRoute.post("/remove",authMiddleware, removeFromCart);
cartRoute.post("/remove",authMiddleware, getCart);


export default cartRoute;