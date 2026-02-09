const {getAllLaptops} = require("../controllers/laptopController");
const express = require("express");
const router = express.Router();
router.get("/laptops",getAllLaptops);
module.exports = router;