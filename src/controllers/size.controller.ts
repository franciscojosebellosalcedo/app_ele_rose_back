import { Request, Response } from "express";
import Size from "../models/size.model";
import { responseHttp } from "../utils/utils";

export const getAllSizes = async (req:Request,res:Response)=>{
    try {

        const allSizes = await Size.find();

        return res.status(200).json(responseHttp( 200 , true , "Tallas" , allSizes));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}