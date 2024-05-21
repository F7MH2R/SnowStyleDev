const express = require("express");
const router = express.Router();
const tallasPrendaController = require("../controllers/tallasPrendaController");

router.get("/", tallasPrendaController.getTallasPrenda);
router.post("/", tallasPrendaController.createTallasPrenda);

module.exports = router;
