//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
/*public virtual string EntityName { get; set; }
        public virtual long EntityID { get; set; }
        public virtual string Street { get; set; }
        public virtual string City { get; set; }
        public virtual string State { get; set; }
        public virtual string Country { get; set; } */
const Addresses = sequelize.define('addresss', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    EntityName: { type:  DataTypes.STRING},
    EntityID: { type:  DataTypes.INTEGER},
    Street: { type:  DataTypes.STRING},
    City: { type:  DataTypes.STRING},
    State: { type:  DataTypes.STRING},
    Country: { type:  DataTypes.STRING},
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
module.exports = {Addresses}