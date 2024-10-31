import { Request, Response } from "express";
import Municipality from "../models/municipality.model";
import { responseHttp } from "../utils/utils";

export const getAllMunicipality = async (req:Request , res:Response)=>{
    try {

        const allMunicipalities = await Municipality.find().sort({createdAt: -1});

        return res.status(200).json(responseHttp(200,false,"Municipios", allMunicipalities));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}