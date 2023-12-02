import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
},{timestamps:true});

const Category= mongoose.model('Category',categorySchema);
export default Category;