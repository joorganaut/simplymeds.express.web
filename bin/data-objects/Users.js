//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
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
module.exports = {Users}