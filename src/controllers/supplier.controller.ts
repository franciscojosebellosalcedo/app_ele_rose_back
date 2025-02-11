import { Request, Response } from "express";
import { getListSearch, responseHttp } from "../utils/utils";
import Supplier from "../models/supplier.model";
import { ISupplier } from "../types";
import mongoose from "mongoose";

// disable supplier by id
export const disableSupplier=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const supplierUpdated=await Supplier.findByIdAndUpdate( {_id:id} ,{ status: false});

        if(!supplierUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en deshabilitar el proveedor",null));
        }

        const proveedorFound=await Supplier.findOne({_id: id});

        if(!proveedorFound){

            return res.status(404).json(responseHttp(404, false , "Proveedor no encontrado",null));

        }

        return res.status(200).json(responseHttp(200, true ,"Proveedor deshabilitado", proveedorFound));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

// enable supplier by id
export const enableSupplier=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const supplierUpdated=await Supplier.findByIdAndUpdate( {_id:id} ,{ status: true});

        if(!supplierUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en habilitar el proveedor",null));
        }

        const supplierFound=await Supplier.findOne({_id: id});

        if(!supplierFound){

            return res.status(404).json(responseHttp(404, false , "Proveedor no encontrado",null));

        }

        return res.status(200).json(responseHttp(200, true ,"Proveedor habilitado", supplierFound));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}


// update supplier by id
export const updateSupplierById = async (req:Request , res:Response)=>{
    try {

        const id = req.params.id;
        const newData : ISupplier = req.body;

        const allSuppliers = await Supplier.find();

        if(id && mongoose.Types.ObjectId.isValid(id)){

            const supplierFound =await  Supplier.findById(id);

            if(supplierFound){

                const filterSuppliers = allSuppliers.filter((supplier) => supplier.name !== supplierFound.name);

                const bool = filterSuppliers.some((supplier) => supplier.name?.trim().toLocaleLowerCase() === newData.name?.trim().toLocaleLowerCase());

                if(bool){

                    return res.status(400).json(responseHttp(400, false,"Proveedor ya existente", null));

                }

                await Supplier.updateOne({_id: id}, {...newData});

                const clientUpdated=await  Supplier.findById(id);

                return res.status(200).json(responseHttp(200, true ,"Proveedor editado", clientUpdated));

            }

            return res.status(404).json(responseHttp(404,false,"Proveedor no encontrado", null));


        }

        return res.status(400).json(responseHttp(400,false,"Cliente no encontrado", null));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

// paginate suppliers
export const paginateSupplier = async (req:Request,res:Response)=>{
    try {

        const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

        const totalRegisters = await Supplier.countDocuments();

        const totalPages = Math.ceil(totalRegisters / limit);

        const currentPage = Math.min(Math.max(page, 1), totalPages);

        const skip = (currentPage - 1) * limit;

        const suppliers = await Supplier.find().sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        const data = {
            registers: suppliers,       
            currentPage: currentPage,  
            totalPages: totalPages,     
        };

        return res.status(200).json(responseHttp( 200 , true , "",data));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}


// save new supplier
export const saveSupplier = async (req:Request , res:Response)=>{
    try {

        const dataSupplier: ISupplier = req.body;
        
        const supplierFound = await Supplier.findOne({
            $or: [
                { name: { $regex: dataSupplier.name, $options: "i" } },
            ]
        });

        if(supplierFound !== null && supplierFound !== undefined ){
            
            return res.status(400).json(responseHttp(400,false,"Proveedor ya existente", null));

        }

        const supplierNew = await Supplier.create({...dataSupplier});

        const supplierCreated = await supplierNew.save();

        return res.status(201).json(responseHttp(201, true ,"Proveedor creado", supplierCreated));
        
    } catch (error) {
        
        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

// get supplier by id
export const getSupplierById = async (req:Request , res:Response)=>{
    try {

        const id = req.params.id;

        if(id && mongoose.Types.ObjectId.isValid(id)){

            const supplierFound = await Supplier.findById(id);

            if(!supplierFound){

                return res.status(404).json(responseHttp(404 , false , "Proveedor no encontrado", null));

            }

            return res.status(200).json(responseHttp(200, true, "Proveedor encontrado", supplierFound));

        }

        return res.status(404).json(responseHttp(404,false,"Proveedor no encontrado", null));

        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}

// search supplier by value
export const search = async (req:Request,res:Response)=>{
    try {

        const value = req.params.value;

		const dataSearch =  value ? getListSearch(["name", "phone", "email"], value) : {}

        const suppliersFound = await Supplier.find(dataSearch);

        if(suppliersFound.length === 0){

            return res.status(404).json(responseHttp( 404, false ,"No se encontraron registros",null));

        }

        return res.status(200).json(responseHttp( 200 , true , "Proveedores encontrados", suppliersFound));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}


// get all supplier 
export const getAllSuppliers = async ( req : Request , res : Response) =>{
    try {

        const suppliers = await Supplier.find().sort({ createdAt : -1});
        return res.status(200).json( responseHttp(200 , true, "Proveedores", suppliers) );
        
    } catch (error) {
        
        return res.status(400).json( responseHttp(400 , false, "Error en el servidor", null) );

    }
}