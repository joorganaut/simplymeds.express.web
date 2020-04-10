const connection = require('./config/connection.pg.heroku.json');
const { Sequelize, DataTypes, Model } = require('sequelize');
console.log(connection.host + ' ' + connection.port + ' ' + connection.user)
class BusinessObject extends Model{
    constructor(model)
    {
        super(model);
        this.model = model;
        
    }    
}
let sequelize = new Sequelize(
    {
        database: connection.database,
        username: connection.user,
        host: connection.host,
        port: connection.port,
        password: connection.password,
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized : false
            }
        },
        pool: {
            max: 5,
            min: 0,
            idle: 300000,
            acquire: 300000
        },
        logging: log => console.log('logging:', log)
    }
);
module.exports = {BusinessObject, sequelize}