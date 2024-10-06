const orderModel = require("../models/orderSchema");

const createOrder = async (req, res) => {
  try {
    const { userId, totalAmount, orderStatus } = req.body;

    const newOrder = new orderModel({ userId, totalAmount, orderStatus });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order: {
        id: newOrder._id,
        userId: req.token.userId,
        totalAmount: newOrder.team,
        orderStatus: newOrder.orderStatus,
      },
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createOrder };
