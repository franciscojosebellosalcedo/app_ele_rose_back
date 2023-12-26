import { Request, Response } from "express";
import {responseHttp } from "../helpers/helpers";
import Collection from "../models/collection";

export const updateCollection=async (req:Request, res:Response)=>{
    try {
        const newData=req.body;
        const id=req.params.id;
        const updateCollection=await Collection.findByIdAndUpdate({_id:id},{...newData});
        if(updateCollection){
            const collectionUpdated=await Collection.findOne({_id:id});
            return res.status(200).json(responseHttp(200,true,"Colección editada correctamente",collectionUpdated));
        }
        return res.status(400).json(responseHttp(400,false,"No se pudo editar la colección",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}

export const saveCollection=async (req:Request, res:Response)=>{
    try {
        const data=req.body;
        const collectionFound=await Collection.findOne({name:data.name});
        if(!collectionFound){
            const newCollection=new Collection({...data});
            if(newCollection){
                await newCollection.save();
                return res.status(200).json(responseHttp(200,true,"Colleción creada",newCollection));
            }else{
                return res.status(400).json(responseHttp(400,false,"Se produjo un error en crear la colección",null));
            }

        }else{
            return res.status(400).json(responseHttp(400,false,"Colección ya existente",null));
        }

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}

export const getAllCollection=async (req:Request, res:Response)=>{
    try {
        const allCollections=await Collection.find();
        return res.status(200).json(responseHttp(200,true,"Colleción creada",allCollections));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}

export const findOneCollection=async (req:Request, res:Response)=>{
    try {
        const id=req.params.id;
        const collectionFound=await Collection.findOne({_id:id});
        return res.status(200).json(responseHttp(200,true,"Colección encontrada",collectionFound));        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}

export const deleteCollection=async (req:Request, res:Response)=>{
    try {
        const id=req.params.id;
        const collectionDelete=await Collection.findOneAndDelete({_id:id});
        if(collectionDelete){
            return res.status(200).json(responseHttp(200,true,"Colleción eliminada",null));
        }
        return res.status(400).json(responseHttp(400,false,"Error al eliminar la colección",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}