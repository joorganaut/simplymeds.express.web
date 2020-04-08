const connection = require('./connection.json');
var Sequelize = require('sequelize');
const { Op, DataTypes } = Sequelize;

console.log(connection.host + ' ' + connection.port + ' ' + connection.user)
const sequelize = new Sequelize({
    database: connection.database,
    username: connection.user,
    host: connection.host,
    port: connection.port,
    password: connection.password,
    dialect: 'mssql',
    "driver": "msnodesqlv8",
    "dialectOptions": {
        "connectionString": "Driver={SQL Server Native Client 11.0};Server=localhost;Database=simplymeds;user id=sa;password=password10$;Trusted_Connection=yes;",
        "trustedConections": true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 300000,
        acquire: 300000
    },
    port: connection.port,
    logging: log => console.log('logging:', log)
});
module.exports = {sequelize}