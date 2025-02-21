const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const UserModel = require("../models/UsersSchema");

const app = express();
const MONGOOSE_URL = process.env.MONGO_URL;
try {
  mongoose.connect(MONGOOSE_URL);
  console.log("Connected to MongoDB");
} catch {
  console.log("cannot connect to the DB");
}

app.use(express.json());
app.use(cors());

app.post("/Signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const userData = { username, email, password };

    const User = new UserModel({ username, email, password });
    await User.save();

    res.status(200).json({
      msg: "Signup ready",
      username,
      email,
      password,
      objectid: mongoose.objectid,
    });
  } catch {
    res.status(404).json({
      Msg: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running at post 3000");
});
