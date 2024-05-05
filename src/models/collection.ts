import mongoose from "mongoose";

const collectionSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    imagen:{
        type:String,
        trim:true
    },
    isAssociatedSlider:{
        type:Boolean,
        default:false
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true
});

const Collection=mongoose.model("Collection",collectionSchema);
export default Collection;