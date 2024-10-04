const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const register = async (req, res) => {
  try {
    const { userName, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      userName,
      email,
      password: hashedPassword,
      address,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(409)
        .json({ success: false, message: "The email already exists" });
    } else {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).populate("role");

    if (user) {
      const isPasswordEqual = await bcrypt.compare(password, user.password);

      if (isPasswordEqual) {
        const payload = {
          userId: user._id,
          userName: user.userName,
          email: user.email,
          address: user.address,
          role: user.role,
        };

        const options = { expiresIn: "60m" };
        const token = jwt.sign(payload, process.env.SECRET, options);

        res
          .status(200)
          .json({ success: true, message: "Login Successful", token });
      } else {
        res.status(401).json({ success: false, message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ success: false, message: "Email not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };
