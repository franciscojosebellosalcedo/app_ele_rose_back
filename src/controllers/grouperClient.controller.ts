import { Request, Response } from "express";
import mongoose from "mongoose";
import Address from "../models/address.model";
import GrouperClient from "../models/grouperClient.model";
import { IAddresModel, IDataGrouperClientModel } from "../types";
import { ORDER_ADDRESS_ENTITY, responseHttp } from "../utils/utils";

// create grouper client
export const saveGrouperClient = async ( req : Request , res : Response)=>{
    try {

        const data : IDataGrouperClientModel[] = req.body;
        
        for (let index = 0; index < data.length; index++) {

            const dataGrouper = data[index];
            
            const { grouperClient , addressGrouper} = dataGrouper;

            const { _id , ...restData} = grouperClient;

            if(_id !== ""){

                await GrouperClient.updateOne( {_id : grouperClient._id} , {...grouperClient} );

                await saveAddressGrouperClient(grouperClient._id , addressGrouper);

            }else{

                const groupClientNew = await GrouperClient.create({...restData});

                const grouperCreated = await groupClientNew.save();

                await saveAddressGrouperClient(grouperCreated._id.toString() , addressGrouper);

            }

        }

        return res.status( 200 ).json( responseHttp(200 , true , "" , null) );
        
    } catch (error) {
        console.log(error);
        
        return res.status( 400 ).json( responseHttp(400 , false , "Error en el servidor" , null) );

    }
}

// save address groupers
const saveAddressGrouperClient = async (idGrouper : string , addressGrouper: IAddresModel[])=>{

    for (let index = 0; index < addressGrouper.length; index++) {

        const groupAddress = addressGrouper[index];
        
        const {_id , ...restData} = groupAddress;

        restData.entityId = idGrouper;

        if(_id && mongoose.Types.ObjectId.isValid(_id)){

            await Address.updateOne({_id: _id}, {...restData});

        }else{

            const addressNew = await Address.create({...restData});
            await addressNew.save();

        }
        
    }

}

// get all groupers client by id client
export const getGrouperClientByIdClient = async ( req : Request , res : Response) =>{
    try {

        const idClient = req.params.idClient;

        const listAux : IDataGrouperClientModel[] = [];

        if(idClient && mongoose.Types.ObjectId.isValid(idClient)){

            const allGroupersFound = await GrouperClient.find({
                $and: [
                    {clientId: idClient}
                ]
            });

            for (let index = 0; index < allGroupersFound.length; index++) {

                const grouper :  any = allGroupersFound[index];

                grouper.status = grouper.status ? 1 : 0 ;

                const allGrouperAddressFound : any = await Address.find({
                    $and: [
                        {entity: ORDER_ADDRESS_ENTITY.groupClient}, {entityId: grouper._id}, 
                    ]
                });

                const data : IDataGrouperClientModel = {

                    grouperClient: grouper,
                    addressGrouper: allGrouperAddressFound

                }

                listAux.push(data);
                
            }

        }

        return res.status(200).json(responseHttp(200, true ,"Agrupadores encontrados", listAux));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor", null));
        
    }
}