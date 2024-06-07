const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUserStatus extends Model { }

RmptUserStatus.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    longname: DataTypes.STRING,
    shortname: DataTypes.STRING
}, {
    sequelize,
    modelName: 'UserStatus',
    tableName: 'rmpt_userstatus',
    timestamps: false
});

module.exports = RmptUserStatus;