import { Request, Response } from "express";
import { getListSearch, responseHttp } from "../utils/utils";
import { TClient } from "../types";
import Client from "../models/client.model";
import mongoose from "mongoose";

export const paginateClients = async (req:Request,res:Response)=>{
    try {

        const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

        const totalRegisters = await Client.countDocuments();

        const totalPages = Math.ceil(totalRegisters / limit);

        const currentPage = Math.min(Math.max(page, 1), totalPages);

        const skip = (currentPage - 1) * limit;

        const clients = await Client.find().sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        const data = {
            registers: clients,       
            currentPage: currentPage,  
            totalPages: totalPages,     
        };

        return res.status(200).json(responseHttp( 200 , true , "",data));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const search = async (req:Request,res:Response)=>{
    try {

        const value = req.params.value;

		const dataSearch =  value ? getListSearch(["name", "phone", "email"], value) : {}

        const clientsFound = await Client.find(dataSearch);

        if(clientsFound.length === 0){

            return res.status(404).json(responseHttp(404,false,"No se encontraron registros",null));

        }

        return res.status(200).json(responseHttp( 200 , true , "Clientes encontrados", clientsFound));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const saveClient = async (req:Request , res:Response)=>{
    try {

        const dataClient: TClient = req.body;
        
        const clientFound = await Client.findOne({$or:[
            { name: {$regex: dataClient.name, $options: "i"} , email: {$regex:  dataClient.email, $options: "i"}, phone: {$regex:  dataClient.phone, $options: "i"} }
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

export const getClientById = async (req:Request , res:Response)=>{
    try {

        const id = req.params.id;

        if(id && mongoose.Types.ObjectId.isValid(id)){

            const clientFound = await Client.findById(id);

            if(!clientFound){
                return res.status(404).json(responseHttp(404,false,"Cliente no encontrado", null));

            }

            return res.status(200).json(responseHttp(200, true, "Cliente encontrado", clientFound));

        }

        return res.status(404).json(responseHttp(404,false,"Cliente no encontrado", null));

        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

export const updateClientById = async (req:Request , res:Response)=>{
    try {

        const id = req.params.id;
        const newData = req.body;

        const allClients = await Client.find();

        if(id && mongoose.Types.ObjectId.isValid(id)){

            const clientFound =await  Client.findById(id);

            if(clientFound){

                const filterClients = allClients.filter((client) => client.name !== clientFound.name);

                const bool = filterClients.some((client) => client.name?.trim().toLocaleLowerCase() === newData.name?.trim().toLocaleLowerCase() || client.phone === newData.phone || client.email?.trim().toLocaleLowerCase() === newData.email?.trim().toLocaleLowerCase());

                if(bool){

                    return res.status(400).json(responseHttp(400,false,"Cliente ya existente con esos datos", null));

                }

                await Client.updateOne({_id: id}, {...newData});

                const clientUpdated=await  Client.findById(id);

                return res.status(200).json(responseHttp(200, true ,"Cliente editado", clientUpdated));

            }

            return res.status(404).json(responseHttp(404,false,"Cliente no encontrado", null));


        }

        return res.status(400).json(responseHttp(400,false,"Cliente no encontrado", null));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}