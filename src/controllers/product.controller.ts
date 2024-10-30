import { Request, Response } from "express";
import Product from "../models/product.model";
import ProductImagen from "../models/productImagen.model";
import { capitalizeNameProduct, deleteFileFromUploadcare, getListSearch, responseHttp } from "../utils/utils";
import { IDataVariant } from "../types";
import Variant from "../models/variant.model";
import mongoose from "mongoose";

export const paginateProducts = async (req:Request,res:Response)=>{
    try {

        const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

        const totalRegisters = await Product.countDocuments();

        const totalPages = Math.ceil(totalRegisters / limit);

        const currentPage = Math.min(Math.max(page, 1), totalPages);

        const skip = (currentPage - 1) * limit;

        const products = await Product.find().sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        const productsWithImages = await Promise.all(products.map(async (product) => {
            const listImagen: any[] = await ProductImagen.find({ product: product._id });
            
            return {
                ...product.toObject(), 
                listImagen: listImagen || [], 
            };
        }));

        const data = {
            registers: productsWithImages,       
            currentPage: currentPage,  
            totalPages: totalPages,     
        };

        return res.status(200).json(responseHttp( 200 , true , "",data));
        
    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const search = async (req:Request,res:Response)=>{
    try {

        const value = req.params.value;

		const dataSearch =  value ? getListSearch(["name"], value) : {}

        const productsFound = await Product.find(dataSearch);

        if(productsFound.length === 0){

            return res.status(404).json(responseHttp(404,false,"No se encontraron registros",null));

        }

        const productsWithImages = await Promise.all(productsFound.map(async (product) => {
            const listImagen: any[] = await ProductImagen.find({ product: product._id });
            
            return {
                ...product.toObject(), 
                listImagen: listImagen || [], 
            };
        }));

        return res.status(200).json(responseHttp( 200 , true , "Productos encontradas", productsWithImages));

    } catch (error) {

        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

export const saveProduct=async (req:Request,res:Response)=>{
    try {

        const data=req.body.product;
        const listImagen=req.body.listImagen;
        const listVariants=req.body.listVariants;

        const productFound=await Product.findOne({name:data.name});

        if(productFound){

            for (let index = 0; index < listImagen.length; index++) {
                const imagen = listImagen[index];
                await deleteFileFromUploadcare(imagen.idUpload);

            }

            return res.status(400).json(responseHttp(400,false,"Producto ya existente",null));

        }

        data.name=capitalizeNameProduct(data.name);

        const newProduct=new Product({...data});

        if(!newProduct){

            return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));

        }


        if(listVariants.length > 0){

            await createAndUpdateVariants(newProduct._id, listVariants);

        }

        for (let index = 0; index < listImagen.length; index++) {
            const imagen = listImagen[index];
            imagen.product = newProduct._id;
            
            const productImagenNew = await ProductImagen.create({...imagen});

            await productImagenNew.save();

        }

        const productCreated = await newProduct.save();

        return res.status(201).json(responseHttp(201,true, "Producto creado" , productCreated));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

export const updateProduct=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const newData=req.body.product;
        const listImagens=req.body.listImagen;
        const listVariants=req.body.listVariants;
        const listRemovedVariants=req.body.listRemovedVariants;
        const listRemovedImagens=req.body.listRemovedImagens;


        if (id || mongoose.Types.ObjectId.isValid(id)) {

            const allProduct = await Product.find();

            const productFound = await Product.findById(id);

            if(productFound){

                const filter = allProduct.filter((product) => product.name !== productFound.name)
                const bool = filter.some((product) => product.name === newData.name);

                if(bool){

                    await removedImagensUploadcare(listImagens);

                    return res.status(400).json(responseHttp(400,false,"Producto ya existente",null));

                }else{

                    const productUpdated = await Product.findOneAndUpdate({_id: id}, {...newData});

                    if(productUpdated){

                        for (let index = 0; index < listImagens.length; index++) {
                        
                            const imagen = listImagens[index];
                            imagen.product = productUpdated._id;
                            
                            const productImagenNew = await ProductImagen.create({...imagen});
                
                            await productImagenNew.save();
                
                        }

                        await createAndUpdateVariants(productUpdated._id, listVariants);

                        await removedVariants(listRemovedVariants);

                        await removedImagens(listRemovedImagens);

                        return res.status(200).json(responseHttp(200,true,"Producto editado",productUpdated));


                    }
                }

            }else{

                await removedImagensUploadcare(listImagens);

                return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));

            }


        }else{

            await removedImagensUploadcare(listImagens);

            return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));

        }
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

const removedVariants = async (listId: string[])=>{
    try {

        for (let index = 0; index < listId.length; index++) {
            const idVariant = listId[index];
            if(idVariant || mongoose.Types.ObjectId.isValid(idVariant)){

                const variantFound = await Variant.findById(idVariant);
                if(variantFound){

                    await Variant.deleteOne({_id: idVariant});
                    
                }
            }
        }
        
    } catch (error) {

        throw new Error("Error al eliminar las variantes");
        
    }
}

const removedImagens = async (list: any[])=>{
    try {

        for (let index = 0; index < list.length; index++) {
            const idImagen = list[index];
            if(idImagen || mongoose.Types.ObjectId.isValid(idImagen)){

                const imagenFound = await ProductImagen.findById(idImagen);
                if(imagenFound){

                    await deleteFileFromUploadcare(imagenFound.idUpload);
                    await ProductImagen.deleteOne({_id: idImagen});

                }
            }
        }
        
    } catch (error) {

        throw new Error("Error al eliminar las imagenes");
        
    }
}

const removedImagensUploadcare = async (list: any[])=>{
    try {

        for (let index = 0; index < list.length; index++) {
            const imagen = list[index];
            await deleteFileFromUploadcare(imagen.idUpload);

        }
        
    } catch (error) {

        throw new Error("Error al eliminar las imagenes de uploadcare");
        
    }
}

const createAndUpdateVariants = async (idProduct: any, variants: IDataVariant [])=>{
    try {

        for (let index = 0; index < variants.length; index++) {
            const variant = variants[index];
            variant.product = idProduct;

            const {_id , ...restData} = variant;

            if (_id || mongoose.Types.ObjectId.isValid(_id)) {

                await Variant.findByIdAndUpdate({_id:_id},{...restData});

            }else{

                const variantNew = await Variant.create({...restData});
    
                await variantNew.save();
            }
    

        }
        
    } catch (error) {
        
        throw new Error("Error en crear las variaantes");
        
    }
}

export const getAllProduct=async (req:Request,res:Response)=>{
    try {

        const allProducts: any[] = await Product.find().sort({ createdAt: -1 });

        const productsWithImages = await Promise.all(allProducts.map(async (pro) => {

            const listImagen: any[] = await ProductImagen.find({ product: pro._id });
            const listVariants: any[] = await Variant.find({ product: pro._id });
            
            return {
                ...pro.toObject(), 
                listImagen: listImagen || [], 
                listVariants: listVariants || [], 
            };

        }));

        return res.status(200).json(responseHttp(200,true,"Productos",productsWithImages));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al obtener los productos",null));
    }
}

export const disableProduct=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const productUpdated=await Product.findByIdAndUpdate( {_id:id} ,{ status: false});

        if(!productUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en deshabilitar el producto",null));
        }

        const productWithDataNew=await Product.findOne({_id: id});

        if(productWithDataNew){

            const productsWithImages = await Promise.all([productWithDataNew].map(async (product) => {
                const listImagen: any[] = await ProductImagen.find({ product: product._id });
                const listVariants: any[] = await Variant.find({ product: product._id });
                
                return {
                    ...product.toObject(), 
                    listImagen: listImagen || [], 
                    listVariants: listVariants || [], 
                };
            }));

            return res.status(200).json(responseHttp(200,true,"Producto deshabilitado", productsWithImages[0]));

        }

        return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const enableProduct=async (req:Request,res:Response)=>{
    try { 
        const id=req.params.id;

        const productUpdated=await Product.findByIdAndUpdate( {_id:id} ,{ status: true});

        if(!productUpdated){

            return res.status(400).json(responseHttp(400,false,"Error en habilitar el producto",null));
        }

        const productWithDataNew=await Product.findOne({_id: id});

        if(productWithDataNew){

            const productsWithImages = await Promise.all([productWithDataNew].map(async (product) => {
                const listImagen: any[] = await ProductImagen.find({ product: product._id });
                const listVariants: any[] = await Variant.find({ product: product._id });
                
                return {
                    ...product.toObject(), 
                    listImagen: listImagen || [], 
                    listVariants: listVariants || [], 
                };
            }));

            return res.status(200).json(responseHttp(200,true,"Producto habilitado", productsWithImages[0]));

        }

        return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
    }
}

export const getOneProductById = async (req:Request , res:Response)=>{
    try {

        const idProduct = req.params.id;

        if(idProduct){

            if (!idProduct || !mongoose.Types.ObjectId.isValid(idProduct)) {

                return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));

            }
    
            const productFound = await Product.findById(idProduct)

            if(productFound){

                const productFoundWithData = await Promise.all([productFound].map(async (product) => {
    
                    const listImagen: any[] = await ProductImagen.find({ product: product._id });
                    const listVariants: any[] = await Variant.find({ product: product._id });
                    
                    return {
                        ...product.toObject(), 
                        listImagen: listImagen || [], 
                        listVariants: listVariants || [], 
                    };
                }));

                return res.status(200).json(responseHttp(200,true,"Producto encontrado", productFoundWithData[0]));

            }

            return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));

        }

        return res.status(404).json(responseHttp(404,false,"Producto no encontrado",null));
        
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en el servidor",null));
        
    }
}

