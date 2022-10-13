const express = require("express");
const router = express.Router();
const path = require("path");

const PublicRootConfig = { root: path.join(__dirname, "../public") };

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  res.status(200).sendFile("Login.html", PublicRootConfig);
});

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.status(200).sendFile("index.html", PublicRootConfig);
});

router.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  res.status(200).sendFile("Register.html", PublicRootConfig);
});

module.exports = router;
