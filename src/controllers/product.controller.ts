import { Request, Response } from "express";
import Product from "../models/product.model";
import ProductImagen from "../models/productImagen.model";
import { capitalizeNameProduct, deleteFileFromUploadcare, getListSearch, responseHttp } from "../utils/utils";
import { IDataVariant } from "../types";
import Variant from "../models/variant.model";

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

        const productCreated: any = await newProduct.save();

        if(listVariants.length > 0){

            await createVariants(productCreated._id, listVariants);

        }

        for (let index = 0; index < listImagen.length; index++) {
            const imagen = listImagen[index];
            imagen.product = productCreated._id;
            
            const productImagenNew = await ProductImagen.create({...imagen});

            await productImagenNew.save();

        }

        return res.status(201).json(responseHttp(201,true, "Producto creado" , productCreated));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

const createVariants = async (idProduct: any, variants: IDataVariant [])=>{
    try {

        for (let index = 0; index < variants.length; index++) {
            const variant = variants[index];
            variant.product = idProduct;

            const {_id , ...restData} = variant;

            const variantNew = await Variant.create({...restData});

            await variantNew.save();
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

export const updateProduct=async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const newData=req.body.product;
        const listImagens=req.body.listImagen;
        const listVariants=req.body.listVariants;
        const listRemovedVariants=req.body.listRemovedVariants;
        const listRemovedImagens=req.body.listRemovedImagens;

        // const update=await Product.findByIdAndUpdate({_id:id},{...newData});
        // if(!update){
        //     return res.status(400).json(responseHttp(400,false,"Error al editar el producto",null));
        // }
        // const productUpdated=await Product.findOne({_id:id}).populate(["category","set"]);
        // return res.status(200).json(responseHttp(200,true,"Producto editado correctamente",productUpdated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error en editar el producto",null));
    }
}