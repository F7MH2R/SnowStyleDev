const express = require("express");
const router = express.Router();
const tallaController = require("../controllers/tallaController");

router.get("/", tallaController.getTallas);
router.post("/", tallaController.createTalla);

module.exports = router;
