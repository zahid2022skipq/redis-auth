var express = require("express");

const User = require("../models/UserDb");
var router = express.Router();

let tempDb = [];

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const existingUser = await User.findOne({ username });
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  console.log("Passed existing user..");
  try {
    const newUser = await new User({
      username,
      password,
    }).save();
    console.log(newUser);
    delete newUser.password;
    req.session.user = newUser;
    return res.status(200).json({ newUser, message: "Success" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;

  const existingUser = tempDb.find((user) => user.username === username);

  if (!existingUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  if (existingUser.password !== password) {
    return res.status(400).json({ message: "Password is incorrect!" });
  }

  req.session.user = existingUser;
  return res
    .status(200)
    .json({ message: "Login Success", session: existingUser });
});

module.exports = router;
