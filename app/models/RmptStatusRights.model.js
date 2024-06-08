const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptStatusRights extends Model { }

RmptStatusRights.init({
    status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RmptUserStatus',
            key: 'usid'
        }
    },
    right: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RmptUserRights',
            key: 'urid'
        }
    },
    access: DataTypes.INTEGER,
    create: DataTypes.INTEGER,
    modify: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'RmptStatusRights',
    tableName: 'rmpt_statusrights',
    timestamps: false
});

module.exports = RmptStatusRights;