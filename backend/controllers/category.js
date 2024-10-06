const categoryModel = require("../models/categorySchema");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = new categoryModel({
      name,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const category = await categoryModel
      .find({})
      .populate("subCategories", "parentCategory");
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Categories not found" });
    }
    return res.status(200).json({ success: true, category });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createCategory, getAllCategories };
