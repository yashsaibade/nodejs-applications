const {getAllMobiles} = require("../controllers/mobileController");
const express = require("express");
const router = express.Router();
router.get("/mobiles",getAllMobiles);
module.exports = router;