require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const userRouter = require("./routes/user");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "No content at this path" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});