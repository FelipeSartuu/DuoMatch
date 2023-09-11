const express = require('express')
const router = express.Router()
const HomeController = require("../controllers/HomeController")

router.get("/", HomeController.showPosts)

router.get("/post/:id", HomeController.post)

module.exports = router