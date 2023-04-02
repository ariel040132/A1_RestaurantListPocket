const express = require("express");
const router = express.Router();

const home = require("./modules/home");
router.use("/", home);
const RestRoute = require("./modules/RestRoute");
router.use("/restaurants", RestRoute);

module.exports = router;
