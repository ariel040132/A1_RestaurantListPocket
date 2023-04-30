const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const RestRoute = require("./modules/RestRoute");
router.use("/", home);
router.use("/restaurants", RestRoute);

module.exports = router;
