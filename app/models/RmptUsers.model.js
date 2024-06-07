const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUsers extends Model { }

RmptUsers.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
        type: DataTypes.INTEGER,
        references: {
            model: 'UserStatus',
            key: 'rowid'
        }
    }
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'rmpt_users',
    timestamps: false
});

module.exports = RmptUsers;