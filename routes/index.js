const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const RestRoute = require("./modules/RestRoute");
const users = require("./modules/users"); // add this

router.use("/", home);
router.use("/restaurants", RestRoute);
router.use("/users", users); // add this

module.exports = router;
