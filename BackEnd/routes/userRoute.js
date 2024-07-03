import express from 'express';
import { creatUser } from '../controller/userController.js';

export const userRouter = express.Router();



userRouter.post("/newuser", creatUser)