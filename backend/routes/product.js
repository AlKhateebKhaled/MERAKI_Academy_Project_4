const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");

const { createProduct } = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/", auth, authorization("create_product"), createProduct);

module.exports = productRouter;
