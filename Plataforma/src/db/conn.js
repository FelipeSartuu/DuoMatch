const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("duomatch", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

try {
    sequelize.authenticate()
    console.log("Conectado com sucesso ao banco de dados")
} 
catch(err) {
    console.log(`Ocorreu um erro durante a conexão com o banco de dados: ${err}`)
}

module.exports = sequelize