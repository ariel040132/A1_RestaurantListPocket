const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const passport = require("passport");
//!登入Get
router.get(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
//!登入Post
router.post("/login", (req, res) => {});
//!註冊Get
router.get("/register", (req, res) => {
  res.render("register");
});
//!註冊Post
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log("This email is existed.");
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//!底部
module.exports = router;
