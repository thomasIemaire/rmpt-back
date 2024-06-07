const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptStatusRights extends Model { }

RmptStatusRights.init({
    status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'UserStatus',
            key: 'rowid'
        }
    },
    right: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'UserRights',
            key: 'rowid'
        }
    },
    access: DataTypes.INTEGER,
    modify: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'StatusRights',
    tableName: 'rmpt_statusrights',
    timestamps: false
});

module.exports = RmptStatusRights;