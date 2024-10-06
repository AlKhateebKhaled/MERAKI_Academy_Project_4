const jwt = require("jsonwebtoken");
const productModel = require("../models/productSchema");
const CategoryModel = require("../models/categorySchema");

const validateProductInput = (productData) => {
  const {
    team,
    description,
    Season,
    Type,
    Brand,
    League,
    price,
    stock,
    categoryID,
    imageURL,
  } = productData;

  if (!team || !price || !stock || !categoryID || !imageURL) {
    return "Fields (team, price, stock, categoryID, imageURL) are required.";
  }
  return null;
};

const createProduct = async (req, res) => {
  try {
    const {
      team,
      description,
      Season,
      Type,
      price,
      Brand,
      League,
      stock,
      categoryID,
      imageURL,
    } = req.body;

    const validationError = validateProductInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const category = await CategoryModel.findById(categoryID);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID." });
    }

    const newProduct = new productModel({
      team,
      description,
      Season,
      Type,
      price,
      Brand,
      League,
      stock,
      categoryID,
      imageURL,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product: {
        id: newProduct._id,
        team: newProduct.team,
        description: newProduct.description,
        Season: newProduct.Season,
        Type: newProduct.Type,
        Brand: newProduct.Brand,
        League: newProduct.League,
        price: newProduct.price,
        stock: newProduct.stock,
        categoryID: newProduct.categoryID,
        imageURL: newProduct.imageURL,
      },
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
};
