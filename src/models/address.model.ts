import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    client: {
      type: String,
      required: true,
    },

    departament: {
      type: String,
      required: true
    },

    municipality: {
      type: String,
      required: true
    },

    referencePoint: {
      type: String,
      required: false,
      default: ""
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true
    }
    
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
