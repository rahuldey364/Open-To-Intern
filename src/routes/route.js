const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegecontroller")
const internController = require("../controllers/internController")


router.post("/createcollege", collegeController.createCollege)
router.post("/createintern", internController.createIntern)


module.exports = router;