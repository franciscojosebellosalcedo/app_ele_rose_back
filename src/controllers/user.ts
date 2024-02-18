import { Request, Response } from "express";
import { isEmailValid, responseHttp } from "../utils/utils";
import User from "../models/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { getTemplateNodemailer, transporter } from "../config/nodemailer";

export const setNewPassword=async(req:Request,res:Response)=>{
    try {
        const token=req.params.token;
        const userFound=await User.findOne({tokenResetPassword:token});
        if(!userFound){
            return res.status(400).json(responseHttp(400,false,"Token no valido"));
        }
        jwt.verify(token,process.env.SECRET_TOKEN_RESET_PASSWORD as string,(error,decoded)=>{
            if(error){
                console.log(error)
            }else{
                console.log(decoded);
            }
        })
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const verifyEmailUser=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        if(isEmailValid(data.email)===false){
            return res.status(400).json(responseHttp(400,false,"Correo no válido"));
        }
        const userFound=await User.findOne({$and : [{email:data.email}, {isAdmin:false}] });
        if(!userFound){
            return res.status(404).json(responseHttp(404,false,"Asegurate de estar registrado"));
        }
        if(userFound.tokenResetPassword.length>0){
            return res.status(200).json(responseHttp(200,true,"Revisa tu correo electrónico y sigue las intrucciones"));
        }
        const dataPayload={"_id":userFound._id,"exp":1679741712};
        const token=jwt.sign({_id:dataPayload._id},process.env.SECRET_TOKEN_RESET_PASSWORD as string,{algorithm:"HS256"});
        await User.findOneAndUpdate({_id:userFound._id},{tokenResetPassword:token});
        const url=process.env.URL_RESET_PASSWORD+`/${token}` as string;
        await transporter.sendMail( {
            from: process.env.NODEMAILER_USER as string,
            to: data.email,
            subject: "Recuperación de cuenta",
            text: "",
            html: getTemplateNodemailer(url),
        });
        return res.status(200).json(responseHttp(200,true,"Te hemos enviado las intrucciones a su correo electrónico"));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const saveUserPage=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        if(!isEmailValid(data.email)){
            return res.status(400).json(responseHttp(400,false,"Correo electrónico no válido",null));
        }
        const userFound=await User.findOne({$and : [{email:data.email}, {isAdmin:false}] });
        if(userFound){
            return res.status(400).json(responseHttp(400,false,"Usuario ya existente",null));
        }
        data.password=await bcrypt.hash(data.password,8);
        const newUserPage=new User({...data});
        if(newUserPage){
            const userPageCreated=await newUserPage.save();
            const payload={name:userPageCreated.name,phone:userPageCreated.phone,address:userPageCreated.address,email:userPageCreated.email,_id:userPageCreated._id}
            const accessToken=jwt.sign({_id:payload._id},process.env.SECRET_ACCESS_TOKEN as string,{algorithm:"HS256"});
            const refressToken=jwt.sign({_id:payload._id},process.env.SECRET_REFRESS_TOKEN as string,{algorithm:"HS256"});
            return res.status(200).json(responseHttp(200,true,"Cuenta creada exitosamente",{user:payload,accessToken:accessToken,refressToken:refressToken}));
        }
        return res.status(400).json(responseHttp(400,false,"Error al crear la cuenta",null));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const loginUserPage=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const userFound=await User.findOne({$and:[{email:data.email,isAdmin:false}]});
        if(!userFound){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        const isPasswordValid=await bcrypt.compare(data.password,(userFound?.password as string));
        if(!isPasswordValid){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        if(userFound.isAdmin===false){
            const payload={name:userFound.name,phone:userFound.phone,address:userFound.address,email:userFound.email,_id:userFound._id};
            const accessToken=jwt.sign({_id:payload._id},process.env.SECRET_ACCESS_TOKEN as string,{algorithm:"HS256"});
            const refressToken=jwt.sign({_id:payload._id},process.env.SECRET_REFRESS_TOKEN as string,{algorithm:"HS256"});
            return res.status(200).json(responseHttp(200,true,"Credenciales validas",{user:payload,refressToken,accessToken}));
        }
        return res.status(400).json(responseHttp(400,false,"Error al iniciar sesión",null));
        
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getNewAccessToken=async (req:Request,res:Response)=>{
    try{
        const headers=req.headers;
        const parts=(headers["access-x"] as string).split(" ");
        if(parts[1]!=="bearer"){
            const refressToken=parts[1];
            jwt.verify(refressToken,(process.env.SECRET_REFRESS_TOKEN as string),async (error,data)=>{
                if(error){
                    return res.status(400).json(responseHttp(400,false,"Token no válido"));
                }
                const idUser=Object(data)._id;
                const userFound=await User.findOne({_id:idUser});
                if(userFound){
                    const dataToken={name:userFound?.name,email:userFound?.email,_id:userFound?._id,phone:userFound.phone,address:userFound.address};
                    const newAccessToken=jwt.sign(dataToken,(process.env.SECRET_ACCESS_TOKEN as string));
                    const newRefressToken=jwt.sign(dataToken,(process.env.SECRET_REFRESS_TOKEN as string));
                    await userFound.save();
                    return res.status(200).json(responseHttp(200,true,"",{user:dataToken,accessToken:newAccessToken,refressToken:newRefressToken}));
                }
            });
        }else{
            return res.status(400).json(responseHttp(400,false,"Token no válido"));
        }
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const userLogin=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const userFound=await User.findOne({email:data.email});
        if(!userFound){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        const isPasswordValid=await bcrypt.compare(data.password,(userFound?.password as string));
        if(!isPasswordValid){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        if(userFound.isAdmin){
            const dataUser={name:userFound?.name,email:userFound?.email,_id:userFound?._id};
            const accessToken=jwt.sign(dataUser,process.env.SECRET_ACCESS_TOKEN as string,{algorithm:"HS256"});
            userFound.save();
            const refressToken=jwt.sign(dataUser,process.env.SECRET_REFRESS_TOKEN as string,{algorithm:"HS256"});
            return res.status(200).json(responseHttp(200,true,"Credenciales validas",{user:dataUser,refressToken,accessToken}));
        }
        return res.status(400).json(responseHttp(400,false,"No tienes permisos en esta aplicación",null));
        
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const saveUser=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        if(data.password.length <8){
            return res.status(400).json(responseHttp(400,false,"La contraseña debe de tener minimo 8 caracteres"));
        }
        const userFound=await User.findOne({email:data.email});
        if(userFound){
            return res.status(400).json(responseHttp(400,false,"Usuario ya existente en el sistema"));
        }
        if(isEmailValid(data.email)){
            data.password=await bcrypt.hash(data.password,8);
            const newUser=new User({...data});
            await newUser.save();
            if(!newUser){
                return res.status(400).json(responseHttp(400,false,"No se pudo crear el usuario"));
            }
            return res.status(200).json(responseHttp(200,true,"Usuario creado correctamente",newUser));
        }
        return res.status(400).json(responseHttp(400,false,"Correo electronico no valido"));
    } catch (error) {
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
        
    }
}

export const deleteUser=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const responseDeleted=await User.findByIdAndDelete({_id:id});
        if(!responseDeleted){
            return res.status(400).json(responseHttp(400,false,"No se pudo eliminar este usuario"));
        }
        return res.status(200).json(responseHttp(200,true,"Usuario eliminado correctamente"));
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllUsers=async (req:Request,res:Response)=>{
    try{
       const allUsers=await User.find(); 
       return res.status(200).json(responseHttp(200,true,"Todos los usuarios",allUsers));
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateUser= async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const dataNew=req.body;
        const userFound=await User.findOne({_id:id});
        if(userFound && userFound?.password){
            if(dataNew.password){
                const compareCurrentpassword=await bcrypt.compare(dataNew.currentPassword,userFound?.password);
                if(!compareCurrentpassword){
                    return res.status(400).json(responseHttp(400,false,"Contraseña actual incorrecta"));
                }
                dataNew.password=await bcrypt.hash(dataNew.password,8);
            }
            delete dataNew.currentPassword;
            const responseUpdated=await User.findOneAndUpdate({_id:id},{...dataNew});
            if(responseUpdated){
                const userUpdate=await User.findOne({_id:id});
                return res.status(200).json(responseHttp(200,true,"Datos actualizados",{_id:userUpdate?._id,name:userFound?.name,email:userFound?.email}));
            }
            return res.status(400).json(responseHttp(400,false,"Error al actualizar el usuario"));
        }
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}