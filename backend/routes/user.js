const express = require("express");
const bcrypt = require("bcrypt");
const { register, login } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

module.exports = userRouter;