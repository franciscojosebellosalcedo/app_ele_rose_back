import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import InfoContact from "../models/infoContact";
import emailjs from "@emailjs/browser";

export const saveInfoContact=async (req:Request,res:Response)=>{
    try {
        const dataInfoContact=req.body;
        const newInfoContact=new InfoContact({...dataInfoContact});
        if(!newInfoContact){
            return res.status(400).json(responseHttp(400,false,"Error en enviar su información",null));
        }
        const serviceID = process.env.EMAIL_JS_SERVICE_ID as string;
        const templateID = process.env.EMAIL_JS_TEMPLATE_ID as string;
     
        await newInfoContact.save();
        const response=await emailjs.send(serviceID, templateID, {});
        console.log(response)
        return res.status(201).json(responseHttp(201,true,"Información enviada correctamente",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}