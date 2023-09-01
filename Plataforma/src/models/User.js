const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        require: true
    },

    email: {
        type: DataTypes.STRING,
        require: true
    },

    password: {
        type: DataTypes.STRING,
        require: true
    },

    age: {
        type: DataTypes.INTEGER,
        require: true,
    },
    
    sex: {
        type: DataTypes.STRING,
        require: true,
    },

    contact: {
        type: DataTypes.STRING,
        require: true,
    }
})

module.exports = User