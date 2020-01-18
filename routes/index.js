const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  //req.app.locals.showLogin = true;
  res.locals.showLogin = 'true';
  res.render("index", { user: req.user });
});

module.exports = router;
