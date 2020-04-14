//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/* public virtual long UserID { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string MiddleName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual DateTime DOB { get; set; }
        public virtual Gender Gender { get; set; }
*/
const sequelize  = BusinessObject.sequelize;
const Patient = sequelize.define('patients', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    UserID: { type:  DataTypes.BIGINT},
    FirstName: { type:  DataTypes.STRING},
    LastName: { type:  DataTypes.STRING},
    MiddleName: { type:  DataTypes.STRING},
    PhoneNumber: { type:  DataTypes.STRING},
    DOB: { type:  DataTypes.DATE},
    Gender: {type: DataTypes.INTEGER},
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
{tableName : 'patients'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Patient}