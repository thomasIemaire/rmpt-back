const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptEarningsFormat extends Model { }

RmptEarningsFormat.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    slots: DataTypes.INTEGER,
    place: DataTypes.INTEGER,
    earnings: DataTypes.DECIMAL(10, 2)
}, {
    sequelize,
    modelName: 'EarningsFormat',
    tableName: 'rmpt_earningsformat',
    timestamps: false
});

module.exports = RmptEarningsFormat;