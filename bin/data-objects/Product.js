//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/*public virtual decimal Cost { get; set; }
        public virtual decimal Price { get; set; }
        //public virtual long Quantity { get; set; }
        public virtual ContainerUnit Unit { get; set; }
        public virtual bool RequiresPrescription { get; set; }
        public virtual string Tags { get;set; }
*/
const sequelize  = BusinessObject.sequelize;
const Product = sequelize.define('products', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Cost: { type:  DataTypes.DECIMAL},
    Price: { type:  DataTypes.DECIMAL},
    Quantity: { type:  DataTypes.INTEGER},
    ContainerUnit: { type:  DataTypes.INTEGER},
    RequiresPrescription: { type:  DataTypes.BOOLEAN},
    Discounted: {type: DataTypes.BOOLEAN},
    DiscountPrice: {type: DataTypes.DECIMAL},
    Tags: { type:  DataTypes.STRING},
    Description: { type:  DataTypes.STRING(1000)},
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
{tableName : 'products'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Product}