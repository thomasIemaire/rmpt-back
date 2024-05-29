const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptSeasons extends Model { }

RmptSeasons.init({
  sid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  longname: {
    type: DataTypes.STRING(128)
  },
  shortname: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  },
  color: {
    type: DataTypes.CHAR(7),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'rmpt_seasons',
  timestamps: false
});

module.exports = RmptSeasons;
