const express = require("express");
const router = express.Router();
const Don = require("../models/don.js");
const mongoose = require("mongoose");

//const User = require("../models/user.js");

const ensureLogin = require("connect-ensure-login");

router.get("/dashboard", ensureLogin.ensureLoggedIn(), function(
  req,
  res,
  next
) {
  Don.find({
    donStatus: "booked",
    preneur: { $in: [mongoose.Types.ObjectId(req.user._id)] }
  })
    .populate("donneur")
    .populate("preneur")
    .then(data => {
      console.log(data);
      // faire un autre find puis faire le count dessus pour avoir le bon nombre
      // const nbPendingDonations = data.length;
      // console.log(nbPendingDonations);
      res.render("association/dashboard", { don: data });
    })
    .catch(err => {
      console.error("Error: ", err);
      next(err);
    });
});

// router.get("/donations", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("association/availableDonations", { user: req.user });
// });

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
  Don.find({ donStatus: "pickedUp" })
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
        preneur: req.user._id
      }
    }
  )
    .then(don => res.redirect("/asso/dashboard"))
    .catch(err => next(err));
});

router.post("/recupere-reservation/:id",(req, res, next)=>{
  Don.update(
    { _id: req.params.id },
    {
      $set: {
        donStatus:"pickedUp",
      }
    }
  )
    .then(don => {
      res.redirect("/asso/dashboard")
    }) 

    .catch(err => next(err));
});

router.post("/annule-reservation/:id", (req, res, next) => {
  Don.update(
    { _id: req.params.id },
    {
      $set: {
        donStatus: "pending",
        preneur: req.user._id
      }
    }
  )
    .then(don => res.redirect("/asso/dashboard"))
    .catch(err => next(err));
});

module.exports = router;
