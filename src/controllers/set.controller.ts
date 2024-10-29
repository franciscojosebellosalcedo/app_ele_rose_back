import { Request, Response } from "express";
import Set from "../models/set.model";
import { deleteFileFromUploadcare, getListSearch, responseHttp, splitUrlImagen } from "../utils/utils";

export const paginateSets = async (req:Request,res:Response)=>{
    try {

        const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

        const totalRegisters = await Set.countDocuments();

        const totalPages = Math.ceil(totalRegisters / limit);

        const currentPage = Math.min(Math.max(page, 1), totalPages);

        const skip = (currentPage - 1) * limit;

        const sets = await Set.find().sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        const data = {
            registers: sets,       
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

		const dataSearch =  value ? getListSearch(["name"], value) : {}

        const setsFound = await Set.find(dataSearch);

        if(setsFound.length === 0){

            return res.status(404).json(responseHttp(404,false,"No se encontraron registros",null));

        }

        return res.status(200).json(responseHttp( 200 , true , "Colecciones encontradas", setsFound));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const updateSet=async (req:Request,res:Response)=>{
    try { 

        const id=req.params.id;

        const newData=req.body;

        const setFound=await Set.findOne({_id:id});

        const bool = newData.imagen === setFound?.imagen;

        if(!bool){

            newData.imagen = `https://ucarecdn.com/${newData.imagen}/`;

            if(setFound){

                const idImagenUploadcare = splitUrlImagen(setFound.imagen);

                await deleteFileFromUploadcare(idImagenUploadcare);

            }

        }

        const setUpdated=await Set.findByIdAndUpdate({_id:id},{...newData});

        if(!setUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en editar la colección" , null));

        }

        const setWithDataNew=await Set.findOne({_id:id});

        return res.status(200).json(responseHttp(200,true,"Colección editada",setWithDataNew));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const saveSet=async(req:Request,res:Response)=>{
    try {
        const data=req.body;

        const setFound=await Set.findOne({name:data.name});

        if(!setFound){

            data.imagen = `https://ucarecdn.com/${data.imagen}/`;

            const newSet=new Set({...data});

            if(!newSet){

                await deleteFileFromUploadcare(data.imagen);

                return res.status(400).json(responseHttp(400,false,"Error al crear la colección",null));

            }

            await newSet.save();

            return res.status(201).json(responseHttp(201,true,"Colección creada",newSet));

        }

        await deleteFileFromUploadcare(data.imagen);

        return res.status(400).json(responseHttp(400,false,"Colección ya existente",null));

        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getAllSets=async (req:Request,res:Response)=>{
    try {

        const allAllSets=await Set.find().sort({createdAt:-1});

        return res.status(200).json(responseHttp(200,true,"Colecciones encontradas",allAllSets));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));

    }
}

export const findOneSet=async (req:Request,res:Response)=>{
    try {

        const id=req.params.id;

        const setFound=await Set.findOne({_id:id});

        if(setFound){

            return res.status(200).json(responseHttp(200,true,"Colección encontrada",setFound));

        }

        return res.status(200).json(responseHttp(400,false,"Colección no encontrada",null));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const disableSet=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const setUpdated=await Set.findByIdAndUpdate( {_id:id} ,{ status: false});

        if(!setUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en deshabilitar la colección",null));
        }

        const setWithDataNew=await Set.findOne({_id:id});

        return res.status(200).json(responseHttp(200,true,"Colección deshabilitada",setWithDataNew));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const enableSet=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const setUpdated=await Set.findByIdAndUpdate( {_id:id} ,{ status: true});

        if(!setUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en habilitar la colección",null));
        }

        const setWithDataNew=await Set.findOne({_id:id});

        return res.status(200).json(responseHttp(200,true,"Colección habilitada",setWithDataNew));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}