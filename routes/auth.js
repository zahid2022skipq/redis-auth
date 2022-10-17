var express = require("express");

const User = require("../models/User");
var router = express.Router();

let tempDb = [];

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  // console.log("EXISTING USER\n", existingUser, "\n\n********\n\n");
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const newUser = await new User({
      username,
      password,
    }).save();

    const user = newUser.toJSON();
    req.session.user = user;
    delete user.password;
    return res.status(200).json({ user, message: "Success" });
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
