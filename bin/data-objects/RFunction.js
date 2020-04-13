//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/*public virtual long RoleID { get; set; }
        public virtual long FunctionID { get; set; }*/
const sequelize  = BusinessObject.sequelize;
const RFunction = sequelize.define('rfunctions', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    RoleName:{ type:  DataTypes.STRING},
    RoleID: { type:  DataTypes.BIGINT},
    FunctionName:{ type:  DataTypes.STRING},
    FunctionID: { type:  DataTypes.BIGINT},
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
{tableName : 'rfunctions'},
 DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {RFunction}