import { Request, Response } from "express";
import Departament from "../models/department.model";
import { responseHttp } from "../utils/utils";

export const getAllDepartament = async (req:Request , res:Response)=>{
    try {

        const allDepartament = await Departament.find().sort({createdAt: -1});

        return res.status(200).json(responseHttp(200,false,"Departamentos", allDepartament));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}