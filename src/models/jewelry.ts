import mongoose from "mongoose";

const jewelrySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    color:{
        type:String,
        enum:["Dorado","Plateado"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    isNow:{
        type:Boolean,
        default:false
    },
    hasPromotion:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
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
    image:{
        type:String,
        default:""
    }
},{timestamps:true});

const Jewelry= mongoose.model('Jewelry',jewelrySchema);
export default Jewelry;