const connection = require('./config/connection.json');
var Sequelize = require('sequelize');
const { Op, DataTypes } = Sequelize;

const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
};
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
const Users = sequelize.define('users', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Username: { type: DataTypes.STRING },
    Password: { type: DataTypes.STRING },
    FullName: { type: DataTypes.STRING },
    FirstName: { type: DataTypes.STRING },
    LastName: { type: DataTypes.STRING },
    Email: { type: DataTypes.STRING },
}, DISABLE_SEQUELIZE_DEFAULTS);
//let User = {};
var GetUserByID = (id) => {
    console.log(id);

    this.ID = id;
    try {
        console.log('i go the hell here ' + this.ID)
        Users.findByPk(this.ID).then(usr => {
            if (usr !== null) {
                console.log(`${JSON.stringify(usr)} Successful`);
                const User = JSON.stringify(usr);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                sequelize.close();
                return User;
            }
        })
        // sequelize
        //     .authenticate()
        //     .then(() => {
        //         console.log('Connection has been established successfully.');
               
        //     })
        //     .catch(err => {
        //         console.error('Unable to connect to the database:', err);
        //     })
    }
    catch (error) {
        console.log(error)
    }

};

module.exports = { GetUserByID }