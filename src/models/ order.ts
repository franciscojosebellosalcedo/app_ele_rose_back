import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
    },
    statusOrder: {
      type: String,
      enum: ["Pending", "Finalized"],
      default: "Pending",
    },
    status:{
      type:String,
      enum:["enabled","disabled"],
      default:"enabled"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
