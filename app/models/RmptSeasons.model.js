const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptSeasons extends Model { }

RmptSeasons.init({
    sid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    longname: DataTypes.STRING,
    shortname: DataTypes.STRING,
    color: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'RmptSeasons',
    tableName: 'rmpt_seasons',
    timestamps: false
});

module.exports = RmptSeasons;