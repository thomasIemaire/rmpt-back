const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptTournaments extends Model { }

RmptTournaments.init({
    rowid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    slots: DataTypes.INTEGER,
    date: DataTypes.DATE,
    host: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'rowid'
        }
    },
    season: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Seasons',
            key: 'rowid'
        }
    }
}, {
    sequelize,
    modelName: 'Tournaments',
    tableName: 'rmpt_tournaments',
    timestamps: false
});

module.exports = RmptTournaments;
