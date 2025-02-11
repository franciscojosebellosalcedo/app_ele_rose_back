import mongoose from "mongoose";

const conditionPaymentSchema=new mongoose.Schema({
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

const ConditionPayment=mongoose.model("ConditionPayment",conditionPaymentSchema);
export default ConditionPayment;