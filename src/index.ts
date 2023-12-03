import app from "./app";
import dotenv from "dotenv";
import { connectToDB } from "./config/db";
dotenv.config();

app.listen(process.env.PORT_SERVER);
console.log(`server runnig on port ${process.env.PORT_SERVER} http://localhost:${process.env.PORT_SERVER}`);
connectToDB();