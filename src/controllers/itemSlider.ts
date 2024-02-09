import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import ItemSlider from "../models/itemSlider";
import Collection from "../models/collection";
import Product from "../models/product";

export const deleteItemSlider=async (req:Request,res:Response)=>{
    const id=req.params.id;
    try {
        const itemFound=await ItemSlider.findOne({_id:id});
        const items=await ItemSlider.find();
        if(items.length===1){
            return res.status(300).json(responseHttp(300,true,"Debes dejar por lo menos un elemento",null));
        }
        if(itemFound?.type==="Producto"){
            await Product.findByIdAndUpdate({_id:itemFound.valueItem},{isAssociatedSlider:false});
        }else if(itemFound?.type==="Colección"){
            await Collection.findByIdAndUpdate({_id:itemFound.valueItem},{isAssociatedSlider:false});
        }
        const itemDeleted=await ItemSlider.findOneAndDelete({_id:id});
        if(itemDeleted){
            return res.status(200).json(responseHttp(200,true,"Elemento eliminado del slider",itemFound));
        }
        return res.status(400).json(responseHttp(400,false,"Error al eliminar el elemento",null));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}

export const getAllItemSlider=async (req:Request,res:Response)=>{
    try {
        const list:any[]=[];
        const items=await ItemSlider.find().populate(["valueItem"]);
        for await (const item of items) {
            if(item?.type==="Producto"){
                const productFound=await Product.findOne({_id:item.valueItem}).populate(["category","collection"]);
                list.unshift({_id:item._id,product:productFound,type:item.type});
            }else if(item?.type==="Colección"){
                const collectionFound=await Collection.findOne({_id:item.valueItem});
                list.unshift({_id:item._id,collection:collectionFound,type:item.type});
            }
        }
        return res.status(200).json(responseHttp(200,true,"Elementos del slider",list));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}

export const saveItemSlider=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const items=await ItemSlider.find();
        const productFound=await Product.findOne({_id:data.valueItem});
        const collectionFound=await Collection.findOne({_id:data.valueItem});
        
        const itemFound=await ItemSlider.findOne({valueItem:data.valueItem});
        if(itemFound){
            if(itemFound.type==="Producto"){
                await ItemSlider.findByIdAndDelete({_id:itemFound._id.toString()});
                await Product.findByIdAndUpdate({_id:data.valueItem},{isAssociatedSlider:!productFound?.isAssociatedSlider});
                const productAssociated=await Product.findOne({_id:itemFound.valueItem}).populate(["category","collection"]);
                return res.status(200).json(responseHttp(200,true,"Producto eliminado del slider",{_id:itemFound._id,idRemoved:true,type:itemFound.type,product:productAssociated}));
            }else if(itemFound.type==="Colección"){
                await ItemSlider.findByIdAndDelete({_id:itemFound._id.toString()});
                await Collection.findByIdAndUpdate({_id:data.valueItem},{isAssociatedSlider:!collectionFound?.isAssociatedSlider});
                const collectionAssociated=await Collection.findOne({_id:itemFound.valueItem})
                return res.status(200).json(responseHttp(200,true,"Colección eliminada del slider",{_id:itemFound._id,idRemoved:true,type:itemFound.type,collection:collectionAssociated}));
            }
        }
        if(items.length===3){
            return res.status(300).json(responseHttp(300,false,"Solo puedes agregar 3 elementos",null));
        }
        const newItem=new ItemSlider({...data});
        if(data.type==="Producto"){
            await Product.findByIdAndUpdate({_id:data.valueItem},{isAssociatedSlider:!productFound?.isAssociatedSlider});
            const itemCreated=await newItem.save();
            const productAssociated=await Product.findOne({_id:itemCreated.valueItem}).populate(["category","collection"]);
            return res.status(200).json(responseHttp(200,true,"Producto agregado al slider",{_id:itemCreated._id,idRemoved:false,type:itemCreated.type,product:productAssociated}));
        }else if(data.type==="Colección"){
            await Collection.findByIdAndUpdate({_id:data.valueItem},{isAssociatedSlider:!collectionFound?.isAssociatedSlider});
            const itemCreated=await newItem.save();
            const collectionAssociated=await Collection.findOne({_id:itemCreated.valueItem})
            return res.status(200).json(responseHttp(200,true,"Colección agregada al slider",{_id:itemCreated._id,idRemoved:false,type:itemCreated.type,collection:collectionAssociated}));
        }
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor",null));
    }
}