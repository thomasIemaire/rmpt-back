const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptPlays extends Model {}

RmptPlays.init({
  fktournament: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'rmpt_tournaments',
      key: 'tid'
    }
  },
  fkuser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'rmpt_users',
      key: 'uid'
    }
  },
  place: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fkkiller: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'rmpt_users',
      key: 'uid'
    }
  }
}, {
  sequelize,
  modelName: 'rmpt_plays',
  timestamps: false
});

module.exports = RmptPlays;
