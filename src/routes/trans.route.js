const express = require("express");
// const validate = require("../../middlewares/validate");
// const userValidation = require("../../validations/user.validation");
// const userController = require("../../controllers/user.controller");
const transController = require("../controllers/trans.controller");

const router = express.Router();

router.get("/", transController.getTransactions);
router.get("/:id", transController.getTransaction);

module.exports = router;
