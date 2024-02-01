import mongoose from "mongoose";

const qualificationSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
    },
    score:{
        type:Number,
        default:5
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
},{timestamps:true});

const User= mongoose.model('Qualification',qualificationSchema);
export default User;