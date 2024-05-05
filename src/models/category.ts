import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
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
},{timestamps:true});

const Category= mongoose.model('Category',categorySchema);
export default Category;