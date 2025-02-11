import mongoose from "mongoose";

const typeSupplierSchema=new mongoose.Schema({
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

const TypeSupplier=mongoose.model("TypeSupplier" , typeSupplierSchema );
export default TypeSupplier;