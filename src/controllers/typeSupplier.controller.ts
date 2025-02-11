import { Request, Response } from "express";
import TypeSupplier from "../models/typeSupplier.model";
import { responseHttp } from "../utils/utils";
import { ITypesSupplier } from "../types";

// create type supplier
export const createTypeSupplier = async ( req:Request,res:Response ) =>{
    try {

        const data : ITypesSupplier = req.body;

        const typeSupplierFound = await TypeSupplier.findOne({ name : data.name});

        if(typeSupplierFound){

            return res.status(400).json(responseHttp(400, false , "Tipo de proveedor ya existente" , null ) );
            
        }

        const typeSupplierNew = new TypeSupplier({...data});
        const typeSupplierCreated = await typeSupplierNew.save();
        
        return res.status(201).json(responseHttp(201, true , "Tipo de proveedor creado" , typeSupplierCreated ) );

    } catch (error) {
        
        return res.status(400).json(responseHttp(400, false , "Error en el servidor" , null ) );

    }
}

// get all types suppliers
export const getAllTypesSupplier = async (req:Request,res:Response)=>{
    try {

        const allTypesSupplier = await TypeSupplier.find();

        return res.status(200).json(responseHttp( 200 , true , "Tipos de proveedores" , allTypesSupplier));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}