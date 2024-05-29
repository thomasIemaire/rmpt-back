const { Sequelize } = require('sequelize');
const { db } = require('./../config/db.config');

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
    logging: console.log
});

module.exports = sequelize;