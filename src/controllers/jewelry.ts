import Jewelry from "../models/jewelry";
import { Request, Response } from "express";
import {responseHttp } from "../helpers/helpers";


export const saveJewelry=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const jewelryFound=await Jewelry.findOne({name:data.name});
        if(jewelryFound){
            return res.status(400).json(responseHttp(400,false,"Producto ya existente",null));
        }
        const newJewelry=new Jewelry({...data});
        if(!newJewelry){
            return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
        }
        await newJewelry.save();
        const jewelryCreated=await Jewelry.findOne({_id:newJewelry._id.toString()}).populate(["category"]);
        return res.status(200).json(responseHttp(200,true,"Producto creado correctamente",jewelryCreated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

export const getAllJewelry=async (req:Request,res:Response)=>{
    try {
        const allJewelry=await Jewelry.find().populate(["category"]).sort({createdAt:-1});
        return res.status(200).json(responseHttp(200,true,"Productos",allJewelry));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

export const deleteJewelry=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const jewelryDeleted=await Jewelry.findByIdAndDelete({_id:id});
        if(!jewelryDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar el producto",null));
        }
        return res.status(200).json(responseHttp(200,true,"Producto eliminado correctamente",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en eliminar el producto",null));
    }
}

export const updateJewelry=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const newData=req.body;
        const update=await Jewelry.findByIdAndUpdate({_id:id},{...newData});
        if(!update){
            return res.status(400).json(responseHttp(400,false,"Error al editar el producto",null));
        }
        const jewelryUpdated=await Jewelry.findOne({_id:id}).populate(["category"]);
        return res.status(200).json(responseHttp(200,true,"Producto editado correctamente",jewelryUpdated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en editar el producto",null));
    }
}