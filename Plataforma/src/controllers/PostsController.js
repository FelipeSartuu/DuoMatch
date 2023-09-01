const Post = require("../models/Post")
const User = require("../models/User")
const {Op} = require("sequelize")

module.exports = class HomeController {
    static mypost(req, res) {
        res.render("posts/mypost")
    }

    static createPost(req, res) {
        res.render("posts/createpost")
    }

    static async createPostSave(req, res) {

        //Pegando os dados passados através do formulário de criação do post e passando para um objt
        const post = {
            title: req.body.title,
            game: req.body.game,
            desc: req.body.desc,
            horario: req.body.horario,
            Userid: req.session.userid
        }
        //Criando um novo post no banco de dados passando o objeto
        await Post.create(post)

        //
        try {
            req.flash("message", "Pensamento criado com sucesso!")
            req.session.save(() => {
            res.redirect("/posts/meusposts")
        })
        } catch (error) {
            console.log(error)
        }
    }
}