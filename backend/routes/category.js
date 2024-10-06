const express = require("express");
const { createCategory, getAllCategories } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);

categoryRouter.get("/", getAllCategories);


module.exports = categoryRouter;
