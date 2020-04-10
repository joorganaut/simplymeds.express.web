const connection = require('./config/connection'); //require('./config/connection.pg.heroku.json');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
console.log('This is the db host: ' + connection.host + ' ssl: '+connection.ssl)
class BusinessObject extends Model {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
let sequelize = new Sequelize({
    database: connection.database,
    username: connection.user,
    host: connection.host,
    port: connection.port,
    password: connection.password,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: connection.ssl === true? {
        ssl: {
            rejectUnauthorized: false
        }
    } : {
        ssl: false
    },
    pool: {
        max: 5,
        min: 0,
        idle: 300000,
        acquire: 300000
    },
    logging: log => console.log('logging:', log)
});
module.exports = {
    BusinessObject,
    sequelize
}