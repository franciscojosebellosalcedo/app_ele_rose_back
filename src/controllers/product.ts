import Product from "../models/product";
import ItemSlider from "../models/itemSlider";
import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import { transporter } from "../config/nodemailer";


export const saveProduct=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const productFound=await Product.findOne({name:data.name});
        if(productFound){
            return res.status(400).json(responseHttp(400,false,"Producto ya existente",null));
        }
        const newProduct=new Product({...data});
        if(!newProduct){
            return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
        }
        await newProduct.save();
        const productCreated=await Product.findOne({_id:newProduct._id.toString()}).populate(["category","collection"]);
        return res.status(200).json(responseHttp(200,true,"Producto creado correctamente",productCreated));
    } catch (error) {
        console.log(error);
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

export const getAllProduct=async (req:Request,res:Response)=>{
    await transporter.sendMail({
        from: "eleroseaccesorios@gmail.com",
        to: "laurasalguedo24@gmail.com",
        subject: "Message title",
        text: "",
        html: "<img src='data:image/jpeg;base64,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'></img>",
      });
    try {
        const allProducts=await Product.find().populate(["category","collection"]).sort({createdAt:-1});
        return res.status(200).json(responseHttp(200,true,"Productos",allProducts));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al obtener los productos",null));
    }
}

export const deleteProduct=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const itemsSlider=await ItemSlider.find();
        const itemSliderFound=itemsSlider.find((item)=>item.valueItem?.toString()===id);
        if(itemsSlider.length===1 && itemSliderFound){
            return res.status(400).json(responseHttp(400,false,"Este producto pertence al slider y es el último elemento, debes dejar por lo menos un elemento en el slider",null));
        }
        await ItemSlider.deleteOne({valueItem:id});
        const productDeleted=await Product.findByIdAndDelete({_id:id});
        if(!productDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar el producto",null));
        }
        return res.status(200).json(responseHttp(200,true,"Producto eliminado correctamente",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en eliminar el producto",null));
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
        const productUpdated=await Product.findOne({_id:id}).populate(["category","collection"]);
        return res.status(200).json(responseHttp(200,true,"Producto editado correctamente",productUpdated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en editar el producto",null));
    }
}