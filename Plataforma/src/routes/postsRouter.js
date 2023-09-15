const express = require('express')
const router = express.Router()
const postsController = require("../controllers/PostsController")

//Helper
const checkAuth = require("../helpers/auth").checkAuth


router.get("/meusposts", checkAuth, postsController.mypost)

router.get("/criar", checkAuth, postsController.createPost)
router.post("/criar", checkAuth, postsController.createPostSave)

router.get("/edit/:id", checkAuth, postsController.editPost)
router.post("/edit", checkAuth, postsController.saveEditPost)

router.post("/remove", checkAuth, postsController.removePost)

module.exports = router