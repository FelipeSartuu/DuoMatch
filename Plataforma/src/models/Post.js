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
User.hasMany(Post); // Um User tem muitos Post

module.exports = Post;
