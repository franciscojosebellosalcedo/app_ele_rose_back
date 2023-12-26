import mongoose from "mongoose";

const itemSliderSchema=new mongoose.Schema({
    typeItem:{
        type:String,
        trim:true
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection" || "Product"
    }
},{timestamps:true});

const ItemSlider= mongoose.model('ItemSlider',itemSliderSchema);
export default ItemSlider;