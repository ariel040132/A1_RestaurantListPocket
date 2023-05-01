const express = require("express");
const router = express.Router();
const { authenticator } = require("../middleware/auth");

const home = require("./modules/home");
const RestRoute = require("./modules/RestRoute");
const users = require("./modules/users"); // add this
const auth = require("./modules/auth");

router.use("/restaurants", authenticator, RestRoute);
router.use("/users", users); // add this
router.use("/auth", auth);
router.use("/", authenticator, home);

module.exports = router;
