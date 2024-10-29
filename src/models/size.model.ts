import mongoose from "mongoose";

const sizeSchema=new mongoose.Schema({
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

const Size=mongoose.model("Size",sizeSchema);
export default Size;