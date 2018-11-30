import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    extraDescription: [String],
    type: String,
    image: String,
    name: String,
    price: Number,
    size: String
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);
export default product;
