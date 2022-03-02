

const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'telebot',
    'yriu',
    'yriu',
    {
        host: '192.168.0.253',
        port: '5432',
    dialect: 'postgres' }
)