import mongoose, { Schema } from "mongoose";

const contactSchema=new Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true
    },
    affair:{
        type:String,
        trim:true,
        default:""
    },
    message:{
        type:String,
        trim:true
    }
},{timestamps:true});

const Contant=mongoose.model("InfoContact",contactSchema);
export default Contant;