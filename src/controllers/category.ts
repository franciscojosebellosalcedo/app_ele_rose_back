import { Request, Response } from "express";
import Category from "../models/category";
import { deleteFileFromUploadcare, getListSearch, responseHttp, splitUrlImagen } from "../utils/utils";

export const paginateCategory = async (req:Request,res:Response)=>{
    try {

        const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

        const totalRegisters = await Category.countDocuments();

        const totalPages = Math.ceil(totalRegisters / limit);

        const currentPage = Math.min(Math.max(page, 1), totalPages);

        const skip = (currentPage - 1) * limit;

        const categories = await Category.find().sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        const data = {
            registers: categories,       
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

        const categoriesFound = await Category.find(dataSearch);

        if(categoriesFound.length === 0){

            return res.status(404).json(responseHttp(404,false,"No se encontraron registros",null));

        }

        return res.status(200).json(responseHttp( 200 , true , "Categorías encontradas", categoriesFound));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const findOneCategory=async (req:Request,res:Response)=>{
    try {

        const id=req.params.id;

        const categoryFound=await Category.findOne({_id:id});

        if(categoryFound){

            return res.status(200).json(responseHttp(200,true,"Categoría encontrada",categoryFound));

        }

        return res.status(200).json(responseHttp(400,false,"Categoría no encontrada",null));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const saveCategory=async(req:Request,res:Response)=>{
    try {
        const data=req.body;

        const categoryFound=await Category.findOne({name:data.name});

        if(!categoryFound){

            data.imagen = `https://ucarecdn.com/${data.imagen}/`;

            const newCategory=new Category({...data});

            if(!newCategory){

                await deleteFileFromUploadcare(data.imagen);

                return res.status(400).json(responseHttp(400,false,"Error al crear categoría",null));

            }

            await newCategory.save();

            return res.status(201).json(responseHttp(201,true,"Categoría creada",newCategory));

        }

        await deleteFileFromUploadcare(data.imagen);

        return res.status(400).json(responseHttp(400,false,"Categoría ya existente",null));

        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getAllCategory=async (req:Request,res:Response)=>{
    try {

        const allAllCategories=await Category.find().sort({createdAt:-1});

        return res.status(200).json(responseHttp(200,true,"Categoría encontradas",allAllCategories));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));

    }
}

export const updateCategory=async (req:Request,res:Response)=>{
    try { 

        const id=req.params.id;

        const newData=req.body;

        const categoryFound=await Category.findOne({_id:id});

        const bool = newData.imagen === categoryFound?.imagen;

        if(!bool){

            newData.imagen = `https://ucarecdn.com/${newData.imagen}/`;

            if(categoryFound){

                const idImagenUploadcare = splitUrlImagen(categoryFound.imagen);

                await deleteFileFromUploadcare(idImagenUploadcare);

            }

        }

        const categoryUpdated=await Category.findByIdAndUpdate({_id:id},{...newData});

        if(!categoryUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en actualizar la categoria",null));

        }

        const categoryWithDataNew=await Category.findOne({_id:id});

        return res.status(200).json(responseHttp(200,true,"Categoría editada",categoryWithDataNew));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const disableCategory=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const categoryUpdated=await Category.findByIdAndUpdate( {_id:id} ,{ status: false});

        if(!categoryUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en deshabilitar la categoría",null));
        }

        const categoryWithDataNew=await Category.findOne({_id:id});

        return res.status(200).json(responseHttp(200,true,"Categoría deshabilitada",categoryWithDataNew));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const enableCategory=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const categoryUpdated=await Category.findByIdAndUpdate( {_id:id} ,{ status: true});

        if(!categoryUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en habilitar la categoría",null));
        }

        const categoryWithDataNew=await Category.findOne({_id:id});

        return res.status(200).json(responseHttp(200,true,"Categoría habilitada",categoryWithDataNew));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}