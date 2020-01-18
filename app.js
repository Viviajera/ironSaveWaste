require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
  })
);

// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});
passport.use(
  new LocalStrategy({ passReqToCallback: true }, (...args) => {
    const [req, , , done] = args;
    const { username, password } = req.body;
    console.log("so far");
    User.findOne({ username })
      .then(user => {
        console.log("user: ", user);
        console.log(
          "machin bcrypt ",
          bcrypt.compareSync(password, user.password)
        );
        if (!user) {
          return done(null, false, { message: "Incorrect eusername" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        console.log("all is good");
        done(null, user);
      })
      .catch(err => done(err));
  })
);

const index = require("./routes/index");
app.use("/", index);

const authentication = require("./routes/authentication");
app.use("/auth", authentication);

const association = require("./routes/association");
app.use("/asso", association);

const restaurant = require("./routes/restaurant");
app.use("/resto", restaurant);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  //console.log("err=", err);

  res.render("error");
});

module.exports = app;
