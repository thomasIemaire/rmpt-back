const { DataTypes, Model } = require('sequelize');
const sequelize = require('./conf.model');

class RmptUsers extends Model { }

RmptUsers.init({
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(128)
  },
  lastname: {
    type: DataTypes.STRING(128)
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true
  },
  phone: {
    type: DataTypes.CHAR(12),
    unique: true
  },
  fkstatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rmpt_status',
      key: 'sid'
    }
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
  modelName: 'rmpt_users',
  timestamps: false
});

module.exports = RmptUsers;
