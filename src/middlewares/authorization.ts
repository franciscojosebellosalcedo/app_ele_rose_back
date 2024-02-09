import { NextFunction, Request, Response } from "express";
import {  responseHttp} from "../utils/utils";
import jwt from "jsonwebtoken";

export const checkAuthorization=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const headers=req.headers;
        if(!headers["access-token"]){
            return res.status(400).json(responseHttp(400,false,"Token no establecido"));
        }
        const parts=(headers["access-token"] as string).split(" ");
        if(parts[1]!="bearer"){
            const accessToken=parts[1];
            jwt.verify(accessToken,(process.env.SECRET_ACCESS_TOKEN as string),async (error,data)=>{
                if(error){
                    return res.status(400).json(responseHttp(400,false,"Token no válido"));
                }
                next();
            });
        }else{
            return res.status(400).json(responseHttp(400,false,"No estas autenticado en esta aplicación"));
        }
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor"));
    }
}