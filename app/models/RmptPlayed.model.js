const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptPlayed extends Model { }

RmptPlayed.init({
    user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RmptUsers',
            key: 'uid'
        }
    },
    tournament: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RmptTournaments',
            key: 'tid'
        }
    },
    place: DataTypes.INTEGER,
    killer: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RmptUsers',
            key: 'uid'
        }
    }
}, {
    sequelize,
    modelName: 'RmptPlayed',
    tableName: 'rmpt_played',
    timestamps: false
});

module.exports = RmptPlayed;