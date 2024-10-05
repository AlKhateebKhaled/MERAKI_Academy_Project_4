const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  accountStatus: {
    type: String,
    enum: ["active", "locked"],
    default: "active",
  },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
