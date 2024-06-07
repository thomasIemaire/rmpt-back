const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptMoreUsers extends Model { }

RmptMoreUsers.init({
    user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'rowid'
        }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
}, {
    sequelize,
    modelName: 'MoreUsers',
    tableName: 'rmpt_moreusers',
    timestamps: false
});

module.exports = RmptMoreUsers;