import express from "express";
import { PORT } from "./config/config";
const app=express();


app.use(express.json());


app.listen(PORT,()=>{
    console.log(`connected to port:${PORT}`);
})
