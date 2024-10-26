import mongoose from "mongoose";

const productImagenSchema = new mongoose.Schema(
  {
    idUpload: {
      type: String,
      required: true,
    },

    imagen: {
      type: String,
      required: true,
    },

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
  },
  {
    timestamps: true,
  }
);

const ProductImagen = mongoose.model("ProductImagen", productImagenSchema);
export default ProductImagen;
