const {getAllWatches} = require("../controllers/watchController");
const express = require("express");
const router = express.Router();
router.get("/watches",getAllWatches);
module.exports = router;