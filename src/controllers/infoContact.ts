import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import InfoContact from "../models/infoContact";

export const saveInfoContact=async (req:Request,res:Response)=>{
    try {
        const dataInfoContact=req.body;
        const newInfoContact=new InfoContact({...dataInfoContact});
        if(!newInfoContact){
            return res.status(400).json(responseHttp(400,false,"Error en enviar su información",null));
        }
        await newInfoContact.save();
        return res.status(201).json(responseHttp(201,true,"Información enviada correctamente",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const getAllInfoContact=async(req:Request,res:Response)=>{
    try {
        const allInfoContact=await InfoContact.find();
        return res.status(200).json(responseHttp(200,true,"Contactos",allInfoContact));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}