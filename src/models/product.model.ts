import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        required: false,
        default: "",
        trim:true
    },
    setId:{
        type: String,
        required:false
    },
    categoryId:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
    },
    existence: {
        type: Number,
        required: true,
        default:0
    },
    cost: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true});

const Product= mongoose.model('Product',productSchema);
export default Product;