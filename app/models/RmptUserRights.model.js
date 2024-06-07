const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUserRights extends Model { }

RmptUserRights.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'UserRights',
    tableName: 'rmpt_userrights',
    timestamps: false
});

module.exports = RmptUserRights;