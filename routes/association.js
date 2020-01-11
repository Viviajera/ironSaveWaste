const express = require("express");
const router = express.Router();

// const User = require("../models/user.js");

const ensureLogin = require("connect-ensure-login");

router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("association/dashboard", { user: req.user });
});

router.get("/historic", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("association/historic", { user: req.user });
});

router.get("/donations", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("association/availableDonations", { user: req.user });
});

module.exports = router;
