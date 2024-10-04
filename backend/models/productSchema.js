const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  imageURL: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
