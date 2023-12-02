import express from "express";
import helmet from "helmet";
import cors from "cors";
import routers from "./routes/router";
import morgan from "morgan";

const app=express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/ele-rose",routers);

export default app;