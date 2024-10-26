import mongoose from "mongoose";

const setSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    imagen:{
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

const Set=mongoose.model("Set",setSchema);
export default Set;