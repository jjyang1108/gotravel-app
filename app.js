const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("dotenv").config();
const User = require("./models/user");

//Connect to Mongo
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport config
app.use(
  require("express-session")({
    secret: "I Love Husky",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    // { usernameField: "email", passwordFiled: "password" },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Routes
//register
app.post("/register", (req, res) => {
  console.log(req.body);

  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err || "somthing wrong" });
    }
    req.logIn(user, function (error) {
      return res.json(user);
    });
  });
});

//login
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     successRedirect: "/",
//   }),
//   (req, res) => {}
// );

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return res.status(500).json({
        message: "Something wrong happend to server",
      });
    }
    req.logIn(user, function (error) {
      if (error) {
        return res.status(404).json({
          message: "Incorrect username or password",
        });
      }
      res.json(user);
    });
  })(req, res, next);
});

app.get("/api", isLoggedIn, (req, res) => {
  res.json({
    message: "hello",
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.json({ message: "loggin first" });
}

//Serve listen
var PORT = process.env.PORT | 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
