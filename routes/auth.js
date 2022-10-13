var express = require("express");
var router = express.Router();

let tempDb = [];

router.post("/register", function (req, res, next) {
  const { username, password } = req.body;

  const existingUser = tempDb.find((user) => user.username === username);

  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = { username, password };
  tempDb.push(user);
  req.session.user = user;
  res.status(200).json({ user, message: "Success" });
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
