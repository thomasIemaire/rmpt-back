const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptStatus extends Model { }

RmptStatus.init({
  sid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'rmpt_status',
  timestamps: false
});

module.exports = RmptStatus;