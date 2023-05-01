const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const passport = require("passport");
//!登入Get
router.get("/login", (req, res) => {
  res.render("login");
});

//!登入Post
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
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

//! 登出路由
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});

//!底部
module.exports = router;
