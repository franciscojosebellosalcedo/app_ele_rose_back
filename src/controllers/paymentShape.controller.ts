import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import PaymentShape from "../models/paymentShape.model";


// get all payment shape
export const getAllPaymentShape = async ( req : Request , res : Response ) =>{
    try {

        const allPaymentsShapes = await PaymentShape.find().sort({createdAt : -1});

        res.status(200).json( responseHttp( 200 , true , "Formas de pagos", allPaymentsShapes) );
        
    } catch (error) {
        
        res.status(400).json( responseHttp( 400 , false , "Error en el servidor", null) );

    }
}