const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptPointsFormat extends Model { }

RmptPointsFormat.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    slots: DataTypes.INTEGER,
    place: DataTypes.INTEGER,
    points: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'PointsFormat',
    tableName: 'rmpt_pointsformat',
    timestamps: false
});

module.exports = RmptPointsFormat;