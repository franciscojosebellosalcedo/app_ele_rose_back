import { Request, Response } from "express";
import { responseHttp } from "../utils/utils";
import ConditionPayment from "../models/conditionPayment.model";


// get all condition payment
export const getAllConditionsPayment = async ( req : Request , res : Response ) =>{
    try {

        const allConditionsPayments = await ConditionPayment.find().sort({createdAt : -1});

        res.status(200).json( responseHttp( 200 , true , "Condiciones de pagos", allConditionsPayments) );
        
    } catch (error) {
        
        res.status(400).json( responseHttp( 400 , false , "Error en el servidor", null) );

    }
}