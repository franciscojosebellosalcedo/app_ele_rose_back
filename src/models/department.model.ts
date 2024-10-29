import mongoose, { Schema } from "mongoose";

const departamenSchema = new Schema(
  {
    name: {
        type: String,
    },

    region: {
        type: String
    }

  },
  { timestamps: true }
);

const Departament = mongoose.model("Departament", departamenSchema);
export default Departament;