const express = require("express");
const {
  addProduct,
  getCart,
  deleteProductFromCart,
  deleteCart,
  updateCartItemQuantity,
} = require("../controllers/cart");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const cartRouter = express.Router();

cartRouter.post("/", auth, accountLockCheck, addProduct);

cartRouter.get("/", auth, accountLockCheck, getCart);

cartRouter.put("/:id", auth, accountLockCheck, updateCartItemQuantity);

cartRouter.delete("/:id", auth, accountLockCheck, deleteProductFromCart);

cartRouter.delete("/", auth, accountLockCheck, deleteCart);

module.exports = cartRouter;
