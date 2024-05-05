import mongoose from "mongoose";

const itemSliderSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:["Producto","Colección"],
        trim:true
    },
    valueItem:{
        type:mongoose.Schema.Types.ObjectId,
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true});

const ItemSlider= mongoose.model('ItemSlider',itemSliderSchema);
export default ItemSlider;