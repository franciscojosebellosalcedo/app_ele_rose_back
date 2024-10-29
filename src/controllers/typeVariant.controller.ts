import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import TypeVariant from "../models/typeVariant.model";

export const getAllTypesVariants = async (req:Request,res:Response)=>{
    try {

        const allTypesVariant = await TypeVariant.find();

        return res.status(200).json(responseHttp( 200 , true , "Tipos de Variantes" , allTypesVariant));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}