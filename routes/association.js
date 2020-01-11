const express = require("express");
const router = express.Router();

// const passport = require("passport");
// const User = require("../models/user.js");

// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

const ensureLogin = require("connect-ensure-login");

router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("association/dashboard", { user: req.user });
});

module.exports = router;