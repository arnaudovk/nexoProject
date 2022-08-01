const express = require("express");
const configRoute = require("./config.route");

const router = express.Router();

router.use("/", configRoute);

module.exports = router;
