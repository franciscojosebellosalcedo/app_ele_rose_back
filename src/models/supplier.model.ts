import mongoose from "mongoose";

const supplierSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required: false
    },
    phone:{
        type: String,
        trim: true,
        required: true
    },
    typeId:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true
});

const Supplier=mongoose.model("Supplier", supplierSchema);
export default Supplier;