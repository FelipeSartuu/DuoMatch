//MiddleWare que verifica se o usuário está logado com base na verificação se o usuário tem um Id ou não.
module.exports.checkAuth = function(req, res, next) {

    //Fazendo a requisição do id do usuário que vem de um item de um usuário do banco de dados mas que foi enviado para a session
    const userId = req.session.userid

    //Verificando se essa variável vai ser preenchida com o id do usuário logado (se for, é pq ta logado)
    if (!userId) {
        res.redirect("/login")
    }

    next()
}