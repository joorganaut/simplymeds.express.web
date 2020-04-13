require('dotenv').config();
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../data-access/businessObject')
const T = require('../data-access/BusinessObjectDAO')
const Role = require('../data-objects/Role').Role;
const UFunction = require('../data-objects/UFunction').UFunction
const UFunctionList = require('../data-access/config/UFunctions')
const sequelize  = BusinessObject.sequelize;
let Production = process.env['PRODUCTION']
let ForceUpdate = process.env['FORCE_UPDATE']
const SchemaUpdate =()=>{ 
    try{
        console.log('ForceUpdate: ' + ForceUpdate + ', Production: '+Production)
        Production ? sequelize.sync({alter: true}) : ForceUpdate? sequelize.sync({force: true}) :  sequelize.sync({alter: true})
    }
    catch(error)
    {
        console.log(error.message)
    }
};
const roleList = [
    {Name : 'Customer'},
    {Name : 'SuperAdmin'},
    {Name : 'AdminPersonel'},
    {Name : 'Accountant'},
    {Name : 'Cashier'},
    {Name : 'InventoryManager'},
    {Name : 'LogisticsPersonel'},
    {Name : 'Vendors'},
    {Name : 'Partners'},
    {Name : 'Hr'},
    {Name : 'MedicalPersonel'}
]
ExecuteQuery = async (query, callback) => {
    try {
        await sequelize.query(query).then(()=>{
            callback();
        })
    } catch (error) {
        throw error.message;
    }
}
const PopulateRoles = async () =>{
    try{
        var data = await T.GetAll(Role);
        if(data.length !== roleList.length)
        {        
            await ExecuteQuery('truncate table Roles RESTART IDENTITY', ()=>{
                roleList.forEach(r => 
                {
                    var rs = {
                        Name : r.Name,
                        CreatedBy : 'System'
                    }
                    T.Save(Role, rs);
                })
            })                         
        }
    }
    catch(error)
    {}
}
const PopulateUserFunctions = async () =>{
    try{
        await ExecuteQuery('truncate table ufunctions RESTART IDENTITY', ()=>{
            UFunctionList.forEach(r => 
            {
                r.Details.forEach(x=>{
                    var rs = {
                        Name : x.Name,
                        Url : x.Details.Url,
                        FGroup : r.Name
                    }
                    T.Save(UFunction, rs);
                })
            })
        })
    }
    catch(error)
    {}
}
module.exports = {SchemaUpdate, PopulateRoles, PopulateUserFunctions}
