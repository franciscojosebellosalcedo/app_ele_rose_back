import mongoose from "mongoose";

const solorSchema=new mongoose.Schema({
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

const Color=mongoose.model("Color",solorSchema);
export default Color;