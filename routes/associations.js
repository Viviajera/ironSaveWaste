const express = require('express');
const router  = express.Router();

const passport = require('passport');
const Assos = require('../models/association.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup", (req, res, next) => {
    const assosNom = req.body.assosNom; 
    const contactassosNom = req.body.contactassosNom;
    const mail = req.body.mail; 
    const motdePasse = req.body.motdePasse;
    const portable = req.body.portable;
    const adresse =req.body.adresse;  //Array d'objets
});
  
    // 1. Check username and password are not empty
    if (assosNom === "" || motdePasse === "") {
      res.render("authentication/signup", { errorMessage: "Indicate username and password" });
      return;
    }
  
    Assos.findOne({ assosNom })
      .then(association => {
        // 2. Check user does not already exist
        if (association) {
          res.render("authentication/signup", { errorMessage: "The username already exists" });
          return;
        }
  
        // Encrypt the password
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
  
        //
        // Save the user in DB
        //
  
        const newAssos = new User({
            assosNom,
            contactassosNom,
            mail, 
            motdePasse: hashPass,
            portable,
            adresse
        });
  
        newAssos.save()
          .then(association => {
            // save user in session: req.user
            req.login(association, err => {
              if (err) return next(err); // Session save went bad
  
              res.redirect('/'); // All good, we are now logged in and `req.user` is now set
            });
          })
          .catch(err => next(err))
        ;
          
      })
      .catch(err => next(err))
  
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
