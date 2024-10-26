import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    set:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Set",
        required:false
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    isNow:{
        type:Boolean,
        default:false
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
    isAssociatedSlider:{
        type:Boolean,
        default:false
    },
    imagen:{
        type:String,
        default:""
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true});

const Product= mongoose.model('Product',productSchema);
export default Product;