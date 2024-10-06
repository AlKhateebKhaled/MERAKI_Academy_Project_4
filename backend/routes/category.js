const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  auth,
  authorization("create_category"),
  createCategory
);

categoryRouter.get("/", accountLockCheck, getAllCategories);

categoryRouter.get("/:id", accountLockCheck, getCategoryById);

categoryRouter.delete(
  "/:id",
  auth,
  authorization("delete_category"),
  deleteCategory
);

module.exports = categoryRouter;
