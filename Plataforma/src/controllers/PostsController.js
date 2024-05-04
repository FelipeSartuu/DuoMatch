const Post = require("../models/Post")
const User = require("../models/User")

module.exports = class HomeController {
    
    static  async mypost(req, res) {

        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Post,
            plain: true,
        })

        if (!user) {
            return res.redirect("/login")
        }

        const posts = user.Posts.map((result) => result.dataValues)

        let userName = user.name

        let emptyPosts = false

        if (posts.length == 0) {
            emptyPosts = true
        }

        res.render("posts/mypost", {posts, emptyPosts, userName})
    }



    static async createPost(req, res) {

        
       // const userId = req.session.id

       // const user = await User.findOne({
       //     where: {
       //         id: userId
       //     },
       //     plain: true   
       // })

       //let userName = user.name
       //let userContact = user.contact
       //let userAge = user.age
        res.render("posts/createpost")
    }



    static async createPostSave(req, res) {

        //Pegando os dados passados através do formulário de criação do post e passando para um objt
        const post = {
            title: req.body.title,
            game: req.body.game,
            desc: req.body.desc,
            horario: req.body.horario,
            UserId: req.session.userid,
            
        }
        //Criando um novo post no banco de dados passando o objeto
        await Post.create(post)

            
        //
        try {
            req.flash("message", "Post criado com sucesso!")
            req.session.save(() => {
            res.redirect("/posts/meusposts")
        })
        } catch (error) {
            console.log(error)
        }

    }

    static async editPost(req, res) {
        const id = req.params.id
        const post = await Post.findOne({
            where: {
                id: id
            },
            raw: true
        })

        res.render("posts/editpost", {post})
    }

    static async saveEditPost(req, res) {

        const id = req.body.id

        const post = {
            title: req.body.title,
            game: req.body.game,
            desc: req.body.desc,
            horario: req.body.horario,
        }

        try {
            await Post.update(post, {where: {id: id}})
            req.flash("message", "Pensamento atualizado com sucesso!")

            req.session.save(() => {
                res.redirect("/posts/meusposts")
            }) 
        } catch(error) {
            console.log(`Erro na atualização do post: ${error}`)
        }
    }

    static async removePost(req, res) {
        const id = req.body.id              //Pegando id do post
        const UserId = req.session.userid   //Pegando id do usuário

        try {
            //Removendo o post clicado onde o Id do usuário daquele post é o mesmo do userId logado no bd
            await Post.destroy({where: {id: id, Userid: UserId}})

            req.flash("message", "Pensamento removido com sucesso!")
            req.session.save(() => {
                res.redirect("/posts/meusposts")
            })

        } catch (error) {
            console.log(error)
        }
    }
}