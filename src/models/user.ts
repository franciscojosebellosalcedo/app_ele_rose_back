import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
},{timestamps:true});

const User= mongoose.model('User',userSchema);
export default User;