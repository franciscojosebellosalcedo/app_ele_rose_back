import express from "express";
import helmet from "helmet";
import cors from "cors";
import routers from "./routes/router";
import morgan from "morgan";
import {config} from 'dotenv';
config();
const app=express();

app.use(express.json({limit:"200mb"}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://page-ele-rose.vercel.app/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors({origin:["https://page-ele-rose.vercel.app/"]}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/",(req,res)=>res.send("Welcome API Ele Rose"));

app.use("/api/ele-rose",routers);

export default app;