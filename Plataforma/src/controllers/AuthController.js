const User = require("../models/User")
const bcrypt = require("bcryptjs")


module.exports = class AuthController {
    static login(req, res) {
        res.render("auth/login")
    }

    //Login
    static async loginPost(req, res) {
        const {email, password} = req.body

        //Procurando pelo usuário no bd de acordo com o e-mail passado (serve para ver se o user existe)
        const user = await User.findOne({where: {email: email}})

        if(!user) {
            req.flash("message", "Usuário não encontrado")
            res.render("auth/login")
            return
        }

        //Comparando a senha digitada com a senha do usuário encontrado para ver se está correta
        const passwordMatch = bcrypt.compareSync(password, user.password) //user.password vem do bd


        //Caso não sejam iguais, o passwordMatch ficará vazio, apartir disso faremos uma verificação
        if(!passwordMatch) {
            req.flash("message", "Senha incorreta!")
            res.render("auth/login")
            return
        }

        //Armazenando o Id do usuário na sessão da requisição
        req.session.userid = user.id    //user.id vem do bd
        
        req.flash("message", "Login realizado com sucesso")

        //Deixando no usuário na sessão que se registrou
        req.session.save(() => {
            res.redirect("/")
        })
    }

    static register(req, res) {
        res.render("auth/register")
    }

    //Register
    static async registerPost(req, res) {
        const {name, age, sex, email, contact, password, confirmpassword} = req.body

        //Validação de senhas iguais
        if (password != confirmpassword) {
            req.flash("message", "As senhas não são iguais, tente novamente!")
            res.render("auth/register")
            return
        }

        //Checkando se o email digitado já está sendo utilizado
        const checkIfUserExist = await User.findOne({where: {email: email}})

        if (checkIfUserExist) {
            req.flash("message", "O e-mail inserido já está sendo utilizado! Tente novamente")
            res.render("auth/register")
            return
        }

        //Criar uma senha criptografada de forma segura
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        //Pegando todos os dados úteis enviados pelo usuário + senha criptografada
        const user = {
            name,
            age,
            sex,
            email,
            contact,
            password: hashedPassword,
        }

        //Criando o usuário de fato no banco de dados e usando o try/catch para registrar possíveis erros
        try {
            const createdUser = await User.create(user)

            //Inicializando sessão do usuário
            req.session.userid = createdUser.id

            req.flash("message", "Cadastro realizado com sucesso")

            //Deixando no usuário na sessão que se registrou
            req.session.save(() => {
                res.redirect("/")
            })

         }
         catch(err) {
            console.log(`Ocorreu um erro no registro! ${err}`)
         }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect("/login")
    }
}