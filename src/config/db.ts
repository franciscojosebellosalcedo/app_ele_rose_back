import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDB=async ()=>{
    if(!process.env.URL_CONNECTION_DB){
        return new Error("env URL_CONNECTION_DB not provide");   
    }
    await mongoose.connect(process.env.URL_CONNECTION_DB);
    console.log("Conection true");
}
