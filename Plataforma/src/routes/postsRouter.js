const express = require('express')
const router = express.Router()
const postsController = require("../controllers/PostsController")



router.get("/meusposts", postsController.mypost)

router.get("/criar", postsController.createPost)
router.post("/criar", postsController.createPostSave)

router.get("/edit/:id", postsController.editPost)
router.post("/edit", postsController.saveEditPost)

router.post("/remove", postsController.removePost)

module.exports = router