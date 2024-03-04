import express from "express";
import helmet from "helmet";
import cors from "cors";
import routers from "./routes/router";
import morgan from "morgan";
import {config} from 'dotenv';
config();
import { connectToDB } from "./config/db";

const app=express();

app.use(express.json({limit:"500mb"}));
app.use(cors({origin:"*"}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/",(req,res)=>res.send("Welcome API Ele Rose"));

app.use("/api/ele-rose",routers);
app.listen(process.env.PORT_SERVER);
console.log(`server runnig on port ${process.env.PORT_SERVER} http://localhost:${process.env.PORT_SERVER}`);
connectToDB();