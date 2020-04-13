//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/*public virtual string Url { get; set; }
        public virtual string FGroup { get; set; }*/
const sequelize  = BusinessObject.sequelize;
const UFunction = sequelize.define('ufunctions', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Url: { type:  DataTypes.STRING},
    FGroup: { type:  DataTypes.STRING},
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    InstitutionCode: { type:  DataTypes.STRING},
    InstitutionID: { type:  DataTypes.INTEGER},
    Name: { type:  DataTypes.STRING},
},
{tableName : 'ufunctions'},
 DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {UFunction}