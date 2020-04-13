const connection = require('./config/connection'); //require('./config/connection.pg.heroku.json');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
console.log('This is the db host: ' + connection.host + ' ssl: '+connection.ssl === true)
class BusinessObject extends Model {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
let useSSL =()=>{
    var result = {};
    if(connection.ssl === 'true')
    {
        result = {
            ssl : {rejectUnauthorized: false}
        }
    }
    else {
        result = {
            ssl : false
        }
    }
    console.log(JSON.stringify(result))
    return result;
}
let sequelize = new Sequelize({
    database: connection.database,
    username: connection.user,
    host: connection.host,
    port: connection.port,
    password: connection.password,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions : useSSL(),
    pool: {
        max: 30,
        min: 1,
        idle: 300000,
        acquire: 300000
    },
    logging: log => console.log('logging:', log)
});
module.exports = {
    BusinessObject,
    sequelize
}