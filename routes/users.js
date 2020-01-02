const express = require('express');
const router  = express.Router();

const passport = require('passport');
const User = require('../models/user.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup", (req, res, next) => {
    const raisonSociale = req.body.raisonSociale;
    const contact = req.body.contact;
    const mail = req.body.mail; 
    const password = req.body.password;
    const portable = req.body.portable;
    const siret = req.body.siret; 
    const adresse = req.body.adresse; 
  
    // 1. Check username and password are not empty
    if (raisonSociale  === "" || password === "") {
      res.render("authentication/signup", { errorMessage: "Indicate username and password" });
      return;
    }
  
    User.findOne({ raisonSociale })
      .then(user => {
        // 2. Check user does not already exist
        if (user) {
          res.render("authentication/signup", { errorMessage: "The username already exists" });
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
          mail,
          password: hashPass,
          portable,
          siret, 
          adresse,
        });
  
        newUser.save()
          .then(user => {
            req.login(user, err => {
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