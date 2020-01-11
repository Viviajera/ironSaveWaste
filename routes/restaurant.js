const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user.js");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const ensureLogin = require("connect-ensure-login");

// router.get("/signup", (req, res) => {
//   res.render("authentication/signup");
// });

module.exports = router;
