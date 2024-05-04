const Post = require("../models/Post")
const User = require("../models/User")
const {Op} = require("sequelize")

module.exports = class HomeController {
    static async showPosts (req, res) {
        
        let search = ""

        if(req.query.search) {
            search = req.query.search
        }

        let order = "DESC"

        if(req.query.order === "old") {
            order = "ASC"
        } else {
            order = "DESC"
        }



        const postsData = await Post.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [["createdAt", order]],

        })
        const posts = postsData.map((result) => result.get({plain: true}))
        
        let postsQty = posts.length

        if(postsQty === 0) {
            postsQty = false
        }

        res.render("home", {posts, search, postsQty})
    }





    static async post(req, res) {

        const id = req.params.id

        const posts = await Post.findAll({
            include: User,
            where: {
                id: id
            },
            raw: true
        })  

        const novosPosts = posts.map(post => ({ 
            ...post, 
            user: { name: post['User.name'], 
            contact:  post['User.contact'], 
            age: post['User.age'],
        }}))

        res.render('posts/post', { posts: novosPosts})
    }
}