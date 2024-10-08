const productModel = require("../models/productSchema");
const userModel = require("../models/userSchema");
const reviewModel = require("../models/reviewSchema");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.token.userId;
    const productId = req.params.id;

    if (!rating || !comment || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating (1-5) and comment are required" });
    }


    const existingReview = await reviewModel.findOne({ productId, userId });
    if (existingReview) {
      return res.status(409).json({ message: "You have already reviewed this product" });
    }

    const newReview = new reviewModel({
      productId,
      userId,
      rating,
      comment,
    });

    await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;

    const reviews = await reviewModel.find({ productId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reviews", error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const updateFields = {};
    if (rating && typeof rating === "number" && rating >= 1 && rating <= 5) {
      updateFields.rating = rating;
    }
    if (comment) updateFields.comment = comment;


    const review = await reviewModel.findByIdAndUpdate(req.params.reviewId, updateFields, { new: true });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await reviewModel.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
