import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import Color from "../models/color.model";

export const getAllColor = async (req:Request,res:Response)=>{
    try {

        const allColors = await Color.find();

        return res.status(200).json(responseHttp( 200 , true , "Colores" , allColors));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}