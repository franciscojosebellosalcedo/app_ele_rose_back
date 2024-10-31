import mongoose from "mongoose";

const clientSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    phone:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true
});

const Client=mongoose.model("Client",clientSchema);
export default Client;