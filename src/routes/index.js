const express = require("express");
const configRoute = require("./config.route");
const transRoute = require("./trans.route");
const router = express.Router();

router.use("/configurations", configRoute);
router.use("/transactions", transRoute);

module.exports = router;
