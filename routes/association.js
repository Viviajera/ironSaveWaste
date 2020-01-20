const express = require("express");
const router = express.Router();
const Don = require("../models/don.js");
const mongoose = require("mongoose");
const ensureLogin = require("connect-ensure-login");

router.get("/dashboard", ensureLogin.ensureLoggedIn(), function(
  req,
  res,
  next
) {
  Promise.all([
    // [0]
    Don.find({
      donStatus: "booked",
      preneur: { $in: [mongoose.Types.ObjectId(req.user._id)] }
    })
      .populate("donneur")
      .populate("preneur"),
    // [1]
    Don.find({ donStatus: "pending" }),
    // [2]
    Don.find({
      donStatus: "pickedUp",
      preneur: { $in: [mongoose.Types.ObjectId(req.user._id)] }
    })
  ])
    .then(data => {
      const bookedDons = data[0];
      const pendingDons = data[1];
      const pickedUpDons = data[2];

      const nbPendingDonations = pendingDons.length;
      const nbPickedUpDonations = pickedUpDons.length;

      return res.render("association/dashboard", {
        booked: bookedDons,
        nbPendingDonations,
        nbPickedUpDonations
      });
    })
    .catch(err => {
      console.error(err);
      return next(err);
    });
});

router.get("/available-donations", ensureLogin.ensureLoggedIn(), function(
  req,
  res,
  next
) {
  Don.find()
    .then(data => {
      const availableDonations = data.filter(
        don => don.donStatus === "pending"
      );
      console.log(data);
      res.render("association/availableDonations", { don: availableDonations });
    })
    .catch(err => {
      console.error("Error: ", err);
      next(err);
    });
});

router.get("/historic", ensureLogin.ensureLoggedIn(), function(req, res, next) {
  Don.find({
    donStatus: "pickedUp",
    preneur: { $in: [mongoose.Types.ObjectId(req.user._id)] }
  })
    .populate("preneur")
    .populate("donneur")
    .then(data => {
      res.render("association/historic", { don: data });
    })
    .catch(err => {
      console.error("Error: ", err);
      next(err);
    });
});

router.post("/reserve-don/:id", (req, res, next) => {
  Don.update(
    { _id: req.params.id },
    {
      $set: {
        donStatus: "booked",
        preneur: req.user._id
      }
    }
  )
    .then(don => res.redirect("/asso/dashboard"))
    .catch(err => next(err));
});

router.post("/annule-reservation/:id", (req, res, next) => {
  Don.update(
    { _id: req.params.id },
    {
      $set: {
        donStatus: "pending"
      }
    }
  )
    .then(don => res.redirect("/asso/dashboard"))
    .catch(err => next(err));
});

router.post("/confirme-recuperation/:id", (req, res, next) => {
  Don.update(
    { _id: req.params.id },
    {
      $set: {
        donStatus: "pickedUp"
      }
    }
  )
    .then(don => res.redirect("/asso/dashboard"))
    .catch(err => next(err));
});

module.exports = router;
