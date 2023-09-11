const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./User");

const Post = db.define("Post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    game: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Associações
Post.belongsTo(User); // Um Post pertence a um User
User.hasMany(Post, { foreignKey: 'userId' }); // Um User tem muitos Posts, 'userId' é o nome da coluna na tabela Post que faz referência à tabela User

module.exports = Post;
