const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const orderRouter = express.Router();

orderRouter.post("/", auth, accountLockCheck, createOrder);

orderRouter.get("/user", auth, accountLockCheck, getUserOrders);

orderRouter.get("/:id", auth, accountLockCheck, getOrderById);

orderRouter.get("/all", auth, accountLockCheck, getOrderById);

orderRouter.put(
  "/:id/status",
  auth,
  authorization("update_order"),
  updateOrderStatus
);
orderRouter.delete("/:id", auth, authorization("delete_order"), deleteOrder);

module.exports = orderRouter;
