import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    departament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departament",
    },

    municipality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Municipality",
    },
    
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
