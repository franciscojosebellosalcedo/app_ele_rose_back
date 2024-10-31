import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    tokenResetPassword:{
        type:String,
        default:"",
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true});

const User= mongoose.model('User',userSchema);
export default User;