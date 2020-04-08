const connection = require('./config/connection.json');
var Sequelize = require('sequelize');
const saltedMd5 = require('salted-md5');
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
    Username: { type:  DataTypes.STRING},
    FirstName: { type:  DataTypes.STRING},
    LastName: { type:  DataTypes.STRING},
    FullName: { type:  DataTypes.STRING},
    Password: { type:  DataTypes.STRING},
    TransactionPin: { type:  DataTypes.STRING},
    IsAuthenticated: { type:  DataTypes.INTEGER},
    ForcePasswordChange: { type:  DataTypes.BOOLEAN},
    LastLoginDate: { type:  DataTypes.DATE},
    NumberOfFailedAttempts: { type:  DataTypes.INTEGER},
    Email: { type:  DataTypes.STRING},
    ActivationLink: { type:  DataTypes.STRING},
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    InstitutionCode: { type:  DataTypes.STRING},
    InstitutionID: { type:  DataTypes.INTEGER},
    Name: { type:  DataTypes.STRING},
}, DISABLE_SEQUELIZE_DEFAULTS);
//let User = {};
const GetUser = (req, res) => {
    this.ID = req.body.ID;
    try {
        console.log('i go the hell here ' + this.ID)
        Users.findByPk(this.ID).then(usr => {
            if (usr !== null) {
                console.log(`${JSON.stringify(usr)} Successful`);
                const User = JSON.stringify(usr);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                //res = (User);
                // res.render('index', { title: User});
                res.send(User)
            }
        })
    }
    catch (error) {
        res.send(error)
        console.log(error)
    }
};
const GetAllUsers = (req, res) => {
    try {
        console.log('i go the hell here ' + req)
        Users.findAll().then(rows => {
            if (rows !== null) {
                console.log(`${JSON.stringify(rows)} Successful`);
                const User = JSON.stringify(rows);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                //res = (User);
                // res.render('index', { title: User});
                res.send(User)
            }
        })
    }
    catch (error) {
        res.send(error)
        console.log(error)
    }
};

const GetUserByEmail = (req, res) => {
    try {
        console.log('i go the hell here ' + req.body.Email)
        var email = req.body.Email;
        Users.findAll({where : {Email : email}}).then(rows => {
            if (rows !== null) {
                console.log(`${JSON.stringify(rows)} Successful`);
                const User = JSON.stringify(rows);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                //res = (User);
                // res.render('index', { title: User});
                res.send(User)
            }
        })
    }
    catch (error) {
        res.send(error)
        console.log(error)
    }
};
const Save = (req, res) => {
    try {
        var params = {
            FirstName : 'Joorgi',
            LastName : 'Spectra',
            FullName : 'Joorgi Spectra',
            Password : saltedMd5('password10$', 'Joorgi'),
        }
        console.log('i go the hell here ' + saltedMd5('password10$', 'Joorgi'))
        Users.create(params).then(rows => {
            if (rows !== null) {
                console.log(`${JSON.stringify(rows.ID)} Successful`);
                const User = JSON.stringify(rows.ID);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                //res = (User);
                // res.render('index', { title: User});
                res.send(User > 0 ? 'Successfull' : 'Failed')
            }
        })
    }
    catch (error) {
        res.send(error)
        console.log(error)
    }
};

module.exports = { GetUser, GetAllUsers, GetUserByEmail, Save }