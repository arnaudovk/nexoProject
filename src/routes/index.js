const express = require("express");
const configRoute = require("./config.route");
const transRoute = require("./trans.route");

const router = express.Router();

router.use("/configuration", configRoute);
router.use("/transaction", transRoute);

module.exports = router;
