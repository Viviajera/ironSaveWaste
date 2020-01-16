const express = require("express");
const router = express.Router();
const Don = require("../models/don.js");

//const User = require("../models/user.js");

const ensureLogin = require("connect-ensure-login");

// router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("association/dashboard", { user: req.user });
// });

router.get("/dashboard", ensureLogin.ensureLoggedIn(), function(
  req,
  res,
  next
) {
  Don.find({ donStatus: "booked" })
    .then(data => {
      console.log(data);
      res.render("association/dashboard", { don: data });
    })
    .catch(err => {
      console.error("Error: ", err);
      next(err);
    });
});

router.get("/donations", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("association/availableDonations", { user: req.user });
});

router.get("/historic", ensureLogin.ensureLoggedIn(), function(req, res, next) {
  Don.find()
    .then(data => {
      console.log(data);
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
        // TODO REMPLACER PAR REQ.USER.RAISONSOCIAL
        preneur: req.user.id
      }
    }
  )
    .then(don => res.redirect("/asso/dashboard"))
    .catch(err => next(err));
});

module.exports = router;
