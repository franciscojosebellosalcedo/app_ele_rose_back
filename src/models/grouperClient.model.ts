import mongoose from "mongoose";

const grouperClientSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    clientId:{
        type:String,
        trim:true,
        required: true
    },
    phone:{
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

const GrouperClient=mongoose.model("GrouperClient",grouperClientSchema);
export default GrouperClient;