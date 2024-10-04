const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  register,
  login,
  getUserProfile,
  getAllUsers,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", auth, getUserProfile);
userRouter.get("/admin", auth, authorization("get_all_users"), getAllUsers);

module.exports = userRouter;
