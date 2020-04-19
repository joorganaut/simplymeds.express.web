//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/* public virtual string ImageString { get => ImageBytes != null ? Convert.ToBase64String(ImageBytes) : string.Empty; set { ImageString = value; } }
        public virtual long ImageEntityID { get => Obj != null ? Obj.ID : 0; set { ImageEntityID = value; } }

        public virtual string ImageEntity { get => Obj != null ? Obj.GetType().Name : string.Empty; set { ImageEntity = value; } }
*/
const sequelize  = BusinessObject.sequelize;
const BusinessImage = sequelize.define('businessimages', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ImageString: { type:  DataTypes.STRING},
    ImageEntityID: { type:  DataTypes.BIGINT},
    ImageEntity: { type:  DataTypes.STRING},
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
{tableName : 'businessimages'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {BusinessImage}