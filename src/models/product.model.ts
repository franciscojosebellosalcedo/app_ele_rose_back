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
    set:{
        type: String,
        required:false
    },
    category:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        default:0
    },
    percentage:{
        type:Number,
        default:0
    },
    realPrice:{
        type:Number,
    },
    pricePromotion:{
        type:Number,
        default:0
    },
    available: {
        type: Number,
        required: true
    },
    existence: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    haveVariant: {
        type: Boolean,
        default: false
    },
    haveDiscount: {
        type: Boolean,
        default: false
    },
    typeVariant:{
        type: String,
        default: "",
        required:false
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true});

const Product= mongoose.model('Product',productSchema);
export default Product;