import express from "express";
import { DB_URI, PORT } from "./config/config";
import router from "./routes";
import mongoConnect from "./db/mongodb";



const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(router)
const DB_URL=DB_URI??""

const database = async () => {
    const client = await mongoConnect(DB_URL);
    app.locals.db = client.db();
  };

  database().then(() => {
    console.log("Database connected");
  });

app.listen(PORT,()=>{
    console.log(`connected to port:${PORT}`);
})
