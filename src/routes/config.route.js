const express = require("express");
// const validate = require("../../middlewares/validate");
// const userValidation = require("../../validations/user.validation");
// const userController = require("../../controllers/user.controller");
const configController = require("../controllers/config.controller");

const router = express.Router();

router.get("/", configController.getConfigurations);
router.post("/configuration", configController.createConfiguration);

module.exports = router;
