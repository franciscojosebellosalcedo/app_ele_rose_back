import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import mongoose from "mongoose";
import Address from "../models/address.model";

export const saveListAddress = async (req:Request , res:Response)=>{
    try {

        const data = req.body;

        for (let index = 0; index < data.length; index++) {

            const address = data[index];
            const {_id , updatedAt , createdAt , ...restData} = address;

            if(_id && mongoose.Types.ObjectId.isValid(_id)){

                await Address.updateOne({_id: _id}, {...restData});

            }else{

                const addressNew = await Address.create({...restData});
                await addressNew.save();

            }
            
        }

        return res.status(201).json(responseHttp(201, true ,"Direcciones creadas", null));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

export const getAllAddressByEntityAndEntityId = async (req:Request , res:Response)=>{
    try {

        const entity = parseInt(req.params.entity);
        const entityId = req.params.entityId;

        if(entityId && mongoose.Types.ObjectId.isValid(entityId)){

            const allAddressFound = await Address.find({
                $and: [
                    {entity: entity}, {entityId: entityId}, 
                ]
            });

            return res.status(200).json(responseHttp(200, true ,"Direcciones encontradas", allAddressFound));

        }

        return res.status(200).json(responseHttp(200, true ,"Direcciones encontradas", []));

        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}