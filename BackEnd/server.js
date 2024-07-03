import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { foodRouter } from './routes/foodRoute.js';
import { userRouter } from './routes/userRoute.js';

//app config
const app = express();
const port = 1999

//Middleware
app.use(express.json());
app.use(cors());
app.use("/Api/food", foodRouter);
app.use("Api/user", userRouter)
app.use("/images", express.static("upload"));
app.use("/foods", foodRouter);
app.use("/remove", foodRouter);
app.use("/newuser", userRouter);


//DB Connection
connectDB();

app.get("/", (req,res)=>{
    res.send("App running")
});

app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`)
})