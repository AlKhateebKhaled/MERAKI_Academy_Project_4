const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
