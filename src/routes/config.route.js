const express = require("express");
const configController = require("../controllers/config.controller");
const router = express.Router();

router.get("/", configController.getConfigurations);
router.get("/:id", configController.getConfiguration);
router.post("/", configController.createConfiguration);

module.exports = router;
