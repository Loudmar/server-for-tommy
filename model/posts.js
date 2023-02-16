const { DataTypes } = require('sequelize');
const sequelize = require('./initSeque');
const User = require('./user');

const Posts = sequelize.define("posts", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
});

Posts.belongsTo(User);
User.hasMany(Posts);

module.exports = Posts;