const express = require("express");
const transController = require("../controllers/trans.controller");
const router = express.Router();

router.get("/", transController.getTransactions);
router.get("/:id", transController.getTransaction);

module.exports = router;
