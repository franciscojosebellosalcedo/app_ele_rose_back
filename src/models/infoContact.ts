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

const Contant=mongoose.model("Contact",contactSchema);
export default Contant;