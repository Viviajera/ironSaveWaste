const express = require("express");
const router = express.Router();
const Don = require("../models/don.js");

// const User = require("../models/user.js");

const ensureLogin = require("connect-ensure-login");

router.get("/dashboard", ensureLogin.ensureLoggedIn(), function(
  req,
  res,
  next
) {
  Don.find()
    .then(data => {
      console.log(data);
      res.render("restaurant/dashboard", { don: data });
    })
    .catch(err => {
      console.error("Error: ", err);
      next(err);
    });
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

// router.post("/:id/delete", function(req, res, next) {
//   Don.deleteOne({
//     _id: req.params.id
//   })
//     .then(() => {
//       console.log("Don deleted");
//       res.redirect("/dashboard");
//     })
//     .catch(err => next(err));
// });

router.post("/:id/delete", (req, res, next) => {
  Don.findByIdAndRemove(req.params.id)
    .then(don => res.redirect("/resto/dashboard"))
    .catch(err => next(err));
});

router.get("/:id/edit", (req, res, next) => {
  Don.findOne({ _id: req.params.id })
    .then(don => res.render("restaurant/editDonation", { don }))
    .catch(err => next(err));
});

router.post("/:id", (req, res, next) => {
  Don.update(
    { _id: req.params.id },
    {
      $set: {
        donNom: req.body.donNom
      }
    }
  )
    .then(don => res.redirect("/resto/dashboard"))
    .catch(err => next(err));
});

module.exports = router;
