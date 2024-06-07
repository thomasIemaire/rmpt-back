const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUsers extends Model { }

RmptUsers.init({
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RmptUserStatus',
            key: 'usid'
        }
    }
}, {
    sequelize,
    modelName: 'RmptUsers',
    tableName: 'rmpt_users',
    timestamps: false
});

module.exports = RmptUsers;