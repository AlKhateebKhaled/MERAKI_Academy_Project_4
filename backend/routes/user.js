const express = require("express");
const auth = require("../middleware/authentication");

const { register, login, getUserProfile } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", auth, getUserProfile);

module.exports = userRouter;
