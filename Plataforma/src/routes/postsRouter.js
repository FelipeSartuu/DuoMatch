const express = require('express')
const router = express.Router()
const postsController = require("../controllers/PostsController")

router.get("/meusposts", postsController.mypost)

router.get("/criar", postsController.createPost)
router.post("/criar", postsController.createPostSave)

module.exports = router