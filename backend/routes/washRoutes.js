const express = require('express');
const {washBook,viewBooking,deleteBooking}= require("../controller/washController")
const {protect} = require("../middleware/authMiddleware")

const router =  express.Router()


router.route("/book").post(protect,washBook)
router.route("/view").post(protect,viewBooking)
router.route("/delete").post(protect,deleteBooking)


module.exports = router