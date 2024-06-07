const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptResultsTournaments extends Model { }

RmptResultsTournaments.init({
    tournament: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RmptTournaments',
            key: 'tid'
        }
    },
    winnerhand: DataTypes.STRING,
    looserhand: DataTypes.STRING,
    finalboard: DataTypes.STRING
}, {
    sequelize,
    modelName: 'RmptResultsTournaments',
    tableName: 'rmpt_resultstournaments',
    timestamps: false
});

module.exports = RmptResultsTournaments;