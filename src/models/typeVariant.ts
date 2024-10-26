import mongoose from "mongoose";

const typeVariantSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true
});

const TypeVariant=mongoose.model("TypeVariant",typeVariantSchema);
export default TypeVariant;