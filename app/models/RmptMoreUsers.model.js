const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptMoreUsers extends Model { }

RmptMoreUsers.init({
    user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RmptUsers',
            key: 'uid'
        }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
}, {
    sequelize,
    modelName: 'RmptMoreUsers',
    tableName: 'rmpt_moreusers',
    timestamps: false
});

module.exports = RmptMoreUsers;