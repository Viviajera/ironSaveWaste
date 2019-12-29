const express = require('express');
const router  = express.Router();

const passport = require('passport');
const Restaurant = require('../models/restaurant.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup", (req, res, next) => {
    const restaurantNom = req.body.restaurantNom;
    const proprietaireNom = req.body.proprietaireNom;
    const mail = req.body.mail; 
    const motdePasse = req.body.motdePasse;
    const portable = req.body.portable;
    const siret = req.body.siret; 
    const adresse = req.body.adresse; 
  
    // 1. Check username and password are not empty
    if (restaurantNom  === "" || motdePasse === "") {
      res.render("authentication/signup", { errorMessage: "Indicate username and password" });
      return;
    }
  
    Restaurant.findOne({ restaurantNom })
      .then(restaurant => {
        // 2. Check user does not already exist
        if (restaurant) {
          res.render("authentication/signup", { errorMessage: "The username already exists" });
          return;
        }
  
        // Encrypt the password
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
  
        //
        // Save the user in DB
        //
  
        const newRestaurant = new User({
          restaurantNom,
          motdePasse: hashPass,
          proprietaireNom,
          mail,
          portable, 
          siret, 
          adresse,
        });
  
        newRestaurant.save()
          .then(restaurant => {
            req.login(restaurant, err => {
              if (err) return next(err);
              res.redirect('/'); 
            });
          })
          .catch(err => next(err))
        ;
          
      })
      .catch(err => next(err))
    ;
  });
  
  router.get('/login', (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
  });
  
  router.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));
  
  router.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
  });
  
  module.exports = router;