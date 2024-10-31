import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import { TClient } from "../types";
import Client from "../models/client.model";
import mongoose from "mongoose";


export const saveClient = async (req:Request , res:Response)=>{
    try {

        const dataClient: TClient = req.body;
        
        const clientFound = await Client.findOne({$or:[
            { name: {$regex: "value", $options: "i"} , email: {$regex: "value", $options: "i"} }
        ]});

        if(clientFound){

            return res.status(400).json(responseHttp(400,false,"Cliente ya existente", null));

        }

        const clientNew = await Client.create({...dataClient});

        const clientCreated = await clientNew.save();

        return res.status(201).json(responseHttp(201, true ,"Cliente creado", clientCreated));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

export const getAllClients = async (req:Request , res:Response)=>{
    try {

        const allClients = await Client.find().sort({createdAt: -1});

        return res.status(200).json(responseHttp(200, true ,"Clientes", allClients));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

export const getOneClientById = async (req:Request , res:Response)=>{
    try {

        const idClient = req.params.id;

        if(!idClient || !mongoose.Types.ObjectId.isValid(idClient)){

            return res.status(404).json(responseHttp(404, false, "Cliente no encontrado", null));

        }

        const clientFound = await Client.findById(idClient);

        if(!clientFound){

            return res.status(404).json(responseHttp(404, false, "Cliente no encontrado", null));

        }

        return res.status(200).json(responseHttp(200, true, "Cliente encontrado", clientFound));
        
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}