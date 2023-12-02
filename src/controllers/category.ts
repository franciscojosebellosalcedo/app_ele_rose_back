import Category from "../models/category";
import { Request, Response } from "express";
import {responseHttp } from "../helpers/helpers";

export const saveCategory=async(req:Request,res:Response)=>{
    try {
        const data=req.body;
        const categoryFound=await Category.findOne({name:data.name});
        if(categoryFound){
            return res.status(400).json(responseHttp(400,false,"Categoria ya existente",null));
        }
        const newCategory=new Category({...data});
        if(!newCategory){
            return res.status(400).json(responseHttp(400,false,"Error al crear categoria",null));
        }
        await newCategory.save();
        return res.status(201).json(responseHttp(201,true,"Categoria creada correctamente",newCategory));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al crear categoria",null));
    }
}

export const getAllCategory=async (req:Request,res:Response)=>{
    try {
        const allAllCategories=await Category.find();
        return res.status(200).json(responseHttp(200,true,"Categoria encontradas",allAllCategories));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al obtener las categorias",null));
    }
}

export const deleteCategory=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const categoryDeleted=await Category.findByIdAndDelete({_id:id});
        if(!categoryDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar la categoria",null));
        }
        return res.status(200).json(responseHttp(200,true,"Categoria eliminada correctamente",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error el eliminar la categoria",null));
    }
}

export const updateCategory=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;
        const newData=req.body;
        const categoryUpdated=await Category.findByIdAndUpdate({_id:id},{...newData});
        if(!categoryUpdated){
            return res.status(400).json(responseHttp(400,false,"Error en actualizar la categoria",null));
        }
        const categoryWithDataNew=await Category.findOne({_id:id});
        return res.status(200).json(responseHttp(200,true,"Categoria editada correctamente",categoryWithDataNew));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en actualizar la categoria",null));
    }
}