const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");

const { createOrder } = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post(
  "/",
  auth,
  authorization("create_order"),
  accountLockCheck,
  createOrder
);

module.exports = orderRouter;
