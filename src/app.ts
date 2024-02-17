import express from "express";
import helmet from "helmet";
import cors from "cors";
import routers from "./routes/router";
import morgan from "morgan";
import {config} from 'dotenv';
config();
const app=express();

app.use(express.json({limit:"200mb"}));

const allowedOrigins = ['https://page-ele-rose.vercel.app/'];

app.use(cors({
  origin: function (origin, callback) {
    // Comprueba si el origen está en la lista de permitidos o si es una solicitud de misma página (null)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type',
}));

app.use(helmet());
app.use(morgan("dev"));

app.get("/",(req,res)=>res.send("Welcome API Ele Rose"));

app.use("/api/ele-rose",routers);

export default app;