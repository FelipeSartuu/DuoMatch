const express = require('express')
const router = express.Router()
const HomeController = require("../controllers/HomeController")

router.get("/", HomeController.homelist)

module.exports = router