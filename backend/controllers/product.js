const jwt = require("jsonwebtoken");
const productModel = require("../models/userSchema");

const validateProductInput = ({
  name,
  description,
  price,
  stock,
  categoryID,
}) => {
  if (!name || !description || !price || !stock || !categoryID) {
    return "All fields are required.";
  }
  if (typeof price !== "number" || price <= 0) {
    return "Price must be a positive number.";
  }
  if (typeof stock !== "number" || stock < 0) {
    return "Stock cannot be negative.";
  }
  return null;
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryID, imageURL } = req.body;

    const validationError = validateProductInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const newProduct = new productModel({
      name,
      description,
      price,
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
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        categoryID: newProduct.categoryID,
        imageURL: newProduct.imageURL,
        createdAt: newProduct.createdAt,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error: " + err.message });
  }
};

module.exports = { createProduct };
