const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptSeasons extends Model { }

RmptSeasons.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    longname: DataTypes.STRING,
    shortname: DataTypes.STRING,
    color: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
}, {
    sequelize,
    modelName: 'Seasons',
    tableName: 'rmpt_seasons',
    timestamps: false
});

module.exports = RmptSeasons;