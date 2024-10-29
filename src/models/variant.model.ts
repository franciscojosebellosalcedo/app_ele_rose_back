import mongoose from "mongoose";

const variantSchema=new mongoose.Schema({

    valueVariant:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    typeVariant:{
        type:String,
        trim:true
    },

},{
    timestamps:true
});

const Variant=mongoose.model("Variant",variantSchema);
export default Variant;