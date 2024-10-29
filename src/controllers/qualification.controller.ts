import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import Qualification from '../models/qualification.model';

export const saveQualification=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const newQualification=new Qualification({...data});
        if(newQualification){
            const qualificationCreated=await (await newQualification.save()).populate(["user","product"]);
            return res.status(201).json(responseHttp(201,true,"Calificación creada correctamente",qualificationCreated));
        }
        return res.status(400).json(responseHttp(400,false,"Error en crear la clasificación",null));
    } catch (error) {
        console.log(error)
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}
export const getAllQualificationByIdProduct=async(req:Request,res:Response)=>{
    try {
        const idProduct=req.params.idProduct;
        const allQuaificactions=await Qualification.find({product:idProduct.toString()}).populate(["user","product"]).sort({createdAt:-1});
        return res.status(200).json(responseHttp(200,true,"Calificación encontradas",allQuaificactions));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getAllQualification=async (req:Request,res:Response)=>{
    try {
        const allQuaificactions=await Qualification.find().populate(["user","product"]).sort({createdAt:-1});
        return res.status(200).json(responseHttp(200,true,"Todas las calificaciones",allQuaificactions));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}