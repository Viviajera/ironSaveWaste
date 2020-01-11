const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user.js");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// // ICI CA PART EN VRILLE
const ensureLogin = require("connect-ensure-login");

router.get("/signup", (req, res) => {
  res.render("authentication/signup");
});

router.post("/signup", (req, res, next) => {
  const raisonSociale = req.body.raisonSociale;
  const contact = req.body.contact;
  const username = req.body.username;
  const password = req.body.password;
  const portable = req.body.portable;
  const clientType = req.body.clientType;
  const siret = req.body.siret;
  const adresse = {
    street: req.body.street,
    zipCode: req.body.zipCode,
    city: req.body.city
  };

  // 1. Check eusername and password are not empty
  if (username === "" || password === "") {
    res.render("authentication/signup", {
      errorMessage: "Indicate username and password"
    });
    return;
  }

  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("authentication/signup", {
          errorMessage: "The company/asso already exists"
        });
        return;
      }

      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        raisonSociale,
        contact,
        username,
        password: hashPass,
        portable,
        siret,
        clientType,
        adresse
      });

      newUser
        .save()
        .then(user => {
          req.login(user, err => {
            if (err) return next(err);
            res.redirect("/");
          });
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => next(err));
});

router.get("/login", (req, res) => {
  res.render("authentication/login");
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     // if clientType ===
//     successRedirect: "/auth/private-page",

//     failureRedirect: "/login",
//     failureFlash: true
//   })
// );

router.post("/login", (req, res, next) => {
  console.log("coucou");
  passport.authenticate("local", (err, theUser, failureDetails) => {
    console.log("ici");
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }

    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render("auth/login", { errorMessage: "Wrong password or username" });
      return;
    }

    // save user in session: req.user
    req.login(theUser, err => {
      if (err) {
        // Session save went bad
        return next(err);
      }
      if (theUser.clientType === "association") {
        // All good, we are now logged in as association
        res.redirect("/asso/dashboard");
      }
      if (theUser.clientType === "restaurant") {
        // All good, we are now logged in as restaurant
        res.redirect("/resto/dashboard");
      }
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
