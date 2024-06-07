const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptPlayed extends Model { }

RmptPlayed.init({
    user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'rowid'
        }
    },
    tournament: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Tournaments',
            key: 'rowid'
        }
    },
    place: DataTypes.INTEGER,
    killer: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'rowid'
        }
    }
}, {
    sequelize,
    modelName: 'Played',
    tableName: 'rmpt_played',
    timestamps: false
});

module.exports = RmptPlayed;