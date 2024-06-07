const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptTournaments extends Model { }

RmptTournaments.init({
    tid: {
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
            model: 'RmptUsers',
            key: 'uid'
        }
    },
    season: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RmptSeasons',
            key: 'sid'
        }
    }
}, {
    sequelize,
    modelName: 'RmptTournaments',
    tableName: 'rmpt_tournaments',
    timestamps: false
});

module.exports = RmptTournaments;
