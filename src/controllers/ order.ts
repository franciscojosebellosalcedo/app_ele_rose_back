import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import Order from "../models/ order";
import { sendMessageWhatsapp } from "../config/whatsapp";


export const saveOrder=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const ordersUser=await Order.find({user:data.user});
        if(ordersUser.length>0){
            data.num=ordersUser.length+1;
        }else{
            data.num=1;
        }
        const newOrder=new Order({...data});
        if(newOrder){
            const orderCreated=await (await (await newOrder.save()).populate("user")).populate("listProducts.product");
            const {user,listProducts,total}=orderCreated;
            const response:any=await sendMessageWhatsapp({
                user,
                listProducts,
                total
            });
            return res.status(201).json(responseHttp(201,true,"Pedido enviado exitosamente",orderCreated));
        }
        return res.status(400).json(responseHttp(400,false,"Error al enviar el pedido",null));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getAllOrder=async (req:Request,res:Response)=>{
    try {
        const allOrder=await Order.find().populate('user').populate('listProducts.product');
        return res.status(200).json(responseHttp(200,true,"Pedidos",allOrder));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getAllOrderByUser=async (req:Request,res:Response)=>{
    try {
        const idUser=req.params.idUser;
        const allOrderFound=await Order.find({user:idUser.toString()}).populate('user').populate('listProducts.product').sort({
            createdAt:-1
        });
        return res.status(200).json(responseHttp(200,true,"Pedidos encontrados",allOrderFound));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getOrderById=async (req:Request,res:Response)=>{
    try {
        const idOrder=req.params.idOrder;
        const orderFound=await Order.findById(idOrder.toString()).populate('user').populate('listProducts.product');
        return res.status(200).json(responseHttp(200,true,"Pedido encontrado",orderFound));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const finishOrderById=async (req:Request,res:Response)=>{
    try {
        const idOrder=req.params.idOrder;
        await Order.findOneAndUpdate({_id:idOrder.toString()},{statusOrder:"Finalized"});
        const orderUpdated=await Order.findOne({_id:idOrder}).populate('user').populate('listProducts.product');
        return res.status(200).json(responseHttp(200,true,"Pedido finalizado",orderUpdated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}