const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUserRights extends Model { }

RmptUserRights.init({
    urid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'RmptUserRights',
    tableName: 'rmpt_userrights',
    timestamps: false
});

module.exports = RmptUserRights;