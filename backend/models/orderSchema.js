const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number },
  orderStatus: { type: String },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
