const express = require("express");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  register,
  login,
  getUserProfile,
  getAllUsers,
  UpdateUserProfile,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", auth, getUserProfile);
userRouter.get("/admin", auth, authorization("get_all_users"), getAllUsers);
userRouter.put("/profile", auth, UpdateUserProfile);

module.exports = userRouter;
