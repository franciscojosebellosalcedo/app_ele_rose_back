import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import ProductImagen from "../models/productImagen.model";

export const saveProductImagen = async (req:Request , res:Response)=>{
    try {

        const data : { idUpload: string, imagen: string , product: string} [] = req.body;

        for (let index = 0; index < data.length; index++) {

            const itemData = data[index];

            itemData.imagen = `https://ucarecdn.com/${itemData.imagen}/`;

            const productImagenNew = await ProductImagen.create({...itemData});

            await productImagenNew.save();
            
        }
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));

    }
}