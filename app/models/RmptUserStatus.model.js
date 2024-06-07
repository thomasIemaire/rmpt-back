const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUserStatus extends Model { }

RmptUserStatus.init({
    usid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    longname: DataTypes.STRING,
    shortname: DataTypes.STRING
}, {
    sequelize,
    modelName: 'RmptUserStatus',
    tableName: 'rmpt_userstatus',
    timestamps: false
});

module.exports = RmptUserStatus;