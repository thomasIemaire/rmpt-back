const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptTournaments extends Model { }

RmptTournaments.init({
  tid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fkhost: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rmpt_users',
      key: 'uid'
    }
  },
  description: {
    type: DataTypes.BLOB
  },
  fkseason: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rmpt_seasons',
      key: 'sid'
    }
  },
  image: {
    type: DataTypes.STRING(255),
    unique: true
  },
  winner: {
    type: DataTypes.CHAR(8)
  },
  looser: {
    type: DataTypes.CHAR(8)
  },
  board: {
    type: DataTypes.CHAR(20)
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
  modelName: 'rmpt_tournaments',
  timestamps: false
});

module.exports = RmptTournaments;
