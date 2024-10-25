import mongoose, { Schema } from "mongoose";

const municipalitySchema = new Schema(
  {
    departament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departament",
    },

    name: {
        type: String
    }
    
  },
  { timestamps: true }
);

const Municipality = mongoose.model("Municipality", municipalitySchema);
export default Municipality;