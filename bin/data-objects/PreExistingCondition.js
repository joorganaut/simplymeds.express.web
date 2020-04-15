//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/* public virtual long PatientID { get; set; }
        public virtual string TreatmentPlan { get; set; }
        public virtual DateTime LastUsed{get;set;}
*/
const sequelize  = BusinessObject.sequelize;
const PreExistingCondition = sequelize.define('preexistingconditions', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    PatientID: { type:  DataTypes.BIGINT},
    TreatmentPlan: { type:  DataTypes.STRING},
    LastUsed: { type:  DataTypes.DATE},
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
{tableName : 'preexistingconditions'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {PreExistingCondition}