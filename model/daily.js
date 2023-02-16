const { DataTypes } = require('sequelize');
const sequelize = require('./initSeque');
const User = require('./user');

const Daily = sequelize.define("daily", {
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

Daily.belongsTo(User);
User.hasMany(Daily);

module.exports = Daily;
