import { Request, Response } from "express";
import Product from "../models/product";
import { capitalizeNameProduct, responseHttp } from "../utils/utils";


export const saveProduct=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const productFound=await Product.findOne({name:data.name});
        if(productFound){
            return res.status(400).json(responseHttp(400,false,"Producto ya existente",null));
        }
        data.name=capitalizeNameProduct(data.name);
        const newProduct=new Product({...data});
        if(!newProduct){
            return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
        }
        await newProduct.save();
        const productCreated=await Product.findOne({_id:newProduct._id.toString()}).populate(["category","set"]);
        return res.status(200).json(responseHttp(200,true,"Producto creado correctamente",productCreated));
    } catch (error) {
        console.log(error);
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

export const getAllProduct=async (req:Request,res:Response)=>{
    try {
        const allProducts=await Product.find().populate('category').populate('set').sort({createdAt:-1});
        return res.status(200).json(responseHttp(200,true,"Productos",allProducts));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al obtener los productos",null));
    }
}

export const updateProduct=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const newData=req.body;
        const update=await Product.findByIdAndUpdate({_id:id},{...newData});
        if(!update){
            return res.status(400).json(responseHttp(400,false,"Error al editar el producto",null));
        }
        const productUpdated=await Product.findOne({_id:id}).populate(["category","set"]);
        return res.status(200).json(responseHttp(200,true,"Producto editado correctamente",productUpdated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en editar el producto",null));
    }
}