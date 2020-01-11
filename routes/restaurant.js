const express = require("express");
const router = express.Router();

// const User = require("../models/user.js");

const ensureLogin = require("connect-ensure-login");

router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("restaurant/dashboard", { user: req.user });
});

router.get("/historic", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("restaurant/historic", { user: req.user });
});

router.get("/new-donation", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("restaurant/newDonation", { user: req.user });
});

router.post("/new-donation", function(req, res, next) {
  const donNom = req.body.donNom;
  const donType = req.body.donType;
  const donPoids = req.body.donPoids;
  const donneur = req.body.donneur;
  const datePeremtion = req.body.datePeremtion;
  const donStatus = req.body.donStatus;
  const preneur = req.body.preneur;

  Don.create({
    donNom: donNom,
    donType: donType,
    donPoids: donPoids,
    donneur: donneur,
    datePeremtion: datePeremtion,
    donStatus: donStatus,
    preneur: preneur
  })
    .then(() => res.redirect("/resto/dashboard"))
    .catch(() => res.redirect("/resto/new-donation"));
});

module.exports = router;
