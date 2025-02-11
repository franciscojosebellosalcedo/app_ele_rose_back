import mongoose from "mongoose";

const paymentShapeSchema=new mongoose.Schema({
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

const PaymentShape=mongoose.model("PaymentShape", paymentShapeSchema);
export default PaymentShape;