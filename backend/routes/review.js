const express = require("express");

const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const reviewRouter = express.Router();
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

reviewRouter.post("/", auth, accountLockCheck, createReview);

reviewRouter.get("/", auth, accountLockCheck, getProductReviews);

reviewRouter.put("/:reviewId", auth, accountLockCheck, updateReview);

reviewRouter.delete("/:reviewId", auth, accountLockCheck, deleteReview);

module.exports = reviewRouter;
