import { Request, Response } from "express";
import Product from "../models/product";
import ProductImagen from "../models/productImagen";
import { capitalizeNameProduct, deleteFileFromUploadcare, responseHttp } from "../utils/utils";

export const saveProduct=async (req:Request,res:Response)=>{
    try {
        const data=req.body.product;
        const listImagen=req.body.listImagen;

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

        for (let index = 0; index < listImagen.length; index++) {
            const imagen = listImagen[index];
            imagen.product = productCreated._id;
            
            const productImagenNew = await ProductImagen.create({...imagen});

            await productImagenNew.save();

        }

        productCreated.listImagen = await ProductImagen.findOne({product: productCreated._id});

        return res.status(201).json(responseHttp(201,true, "Producto creado" , productCreated));

    } catch (error) {
        
        return res.status(400).json(responseHttp(400,false,"Error al crear el producto",null));
    }
}

export const getAllProduct=async (req:Request,res:Response)=>{
    try {

        const allProducts: any[] = await Product.find().sort({ createdAt: -1 });

        const productsWithImages = await Promise.all(allProducts.map(async (product) => {
            const listImagen: any[] = await ProductImagen.find({ product: product._id });
            
            return {
                ...product.toObject(), 
                listImagen: listImagen || [], 
            };
        }));

        return res.status(200).json(responseHttp(200,true,"Productos",productsWithImages));

    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Error al obtener los productos",null));
    }
}

// export const updateProduct=async (req:Request,res:Response)=>{
//     try {
//         const id=req.params.id;
//         const newData=req.body;
//         const update=await Product.findByIdAndUpdate({_id:id},{...newData});
//         if(!update){
//             return res.status(400).json(responseHttp(400,false,"Error al editar el producto",null));
//         }
//         const productUpdated=await Product.findOne({_id:id}).populate(["category","set"]);
//         return res.status(200).json(responseHttp(200,true,"Producto editado correctamente",productUpdated));
//     } catch (error) {
//         return res.status(400).json(responseHttp(400,false,"Error en editar el producto",null));
//     }
// }