import { Request, Response } from "express";
import {responseHttp } from "../utils/utils";
import Order from "../models/order.model";
import { sendMessageWhatsapp } from "../config/whatsapp";
import Product from "../models/product.model";


export const saveOrder=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const ordersUser=await Order.find({user:data.user,statusOrder:"enabled"});
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
        const allOrder=await Order.find().populate('user').populate('listProducts.product').sort({
            createdAt:-1
        });
        return res.status(200).json(responseHttp(200,true,"Pedidos",allOrder));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getAllOrderByUser=async (req:Request,res:Response)=>{
    try {
        const idUser=req.params.idUser;
        const allOrderFound=await Order.find({user:idUser.toString()}).populate('user').populate('listProducts.product');
        return res.status(200).json(responseHttp(200,true,"Pedidos encontrados",allOrderFound));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getOrderById=async (req:Request,res:Response)=>{
    try {
        const idOrder=req.params.idOrder;
        const orderFound=await Order.findOne({_id:idOrder.toString()}).populate('user').populate('listProducts.product');
        return res.status(200).json(responseHttp(200,true,"Pedido encontrado",orderFound));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const changeStatusOrderById=async (req:Request,res:Response)=>{
    try {
        const idOrder=req.params.idOrder;
        const data=req.body;
        const {statusOrder}=data;
        if(statusOrder=== "In process" ){
            const orderFound= await Order.findOne({_id: idOrder});
            const listProducts= orderFound?.listProducts;
            if(listProducts && listProducts.length>0){
                for (let index = 0; index < listProducts.length; index++) {
                    const itemProduct = listProducts[index];
                    if(itemProduct.product && itemProduct.amount){
                        const productFound= await Product.findOne({_id: itemProduct.product.toString()});
                        if(productFound && productFound.amount >= itemProduct.amount){
                            await Product.updateOne({_id: itemProduct.product?.toString()},{amount: productFound.amount - itemProduct.amount})
                        }
                    }
                    
                }
            }
        }
        if(statusOrder==="Canceled"){
            await Order.findOneAndUpdate({_id:idOrder.toString()},{statusOrder:statusOrder,status:"disabled"});
        }else{
            await Order.findOneAndUpdate({_id:idOrder.toString()},{statusOrder:statusOrder,status:"enabled"});
        }
        const orderUpdated=await Order.findOne({_id:idOrder}).populate('user').populate('listProducts.product');
        return res.status(200).json(responseHttp(200,true,`Pedido en estado ${statusOrder==="Pending" ? "pendiente":statusOrder==="In process"?"en proceso":statusOrder==="Sent"? "enviado":statusOrder==="Finalized"?"finalizado":statusOrder==="Canceled"?"cancelado":""}`,orderUpdated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}