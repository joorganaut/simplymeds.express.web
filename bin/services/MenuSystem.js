//const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const T = require('../data-access/BusinessObjectDAO');
let Roles = require('../data-objects/Role').Role;
let UserRoles = require('../data-objects/UserRole').UserRole;
let RFunctions = require('../data-objects/RFunction').RFunction;
let UFunctions = require('../data-objects/UFunction').UFunction;
class MenuSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    
    async RetrieveMenu() {
        var result = {
            RoleData: [],
            UFunctionData: [],
            RFunctionData: []
        };
        var response;
        try {
            await T.GetAll(Roles).then(async data => {
                result.RoleData = data;
                await T.GetAll(RFunctions).then(async data => {
                    result.RFunctionData = data;
                    await T.GetAll(UFunctions).then(async data => {
                        result.UFunctionData = data;
                        response = {
                            records: result,
                            Message: Responses.MessageResponse_SUCCESS.Message,
                            Code: Responses.MessageResponse_SUCCESS.Code
                        }
                        this.res.send(JSON.stringify(response));
                    })
                })
            });

        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }

    }
    async RetrieveMenuByUser() {
        var result = {
            RoleData: [],
            UFunctionData: [],
            RFunctionData: []
        };
        var response;
        try {
            //await T.GetAllBy(UserRoles, {RoleID : this.req.body.RoleID}).then
            await T.Get(req.body.ID).then(async data => {
                if (data != null) {
                    await T.GetAllBy(UserRoles, {UserID : data.ID}).then(async data => {
                        result.RoleData = data;
                        data.forEach(async x=>{
                            await T.GetAllBy(RFunctions, {RoleID : x.RoleID}).then(async data => {
                                result.RFunctionData = data;
                                data.forEach(async x=>{
                                    await T.GetAllby(UFunctions, {ID : x.FunctionID}).then(async data => {
                                        result.UFunctionData = data;
                                        response = {
                                            records: result,
                                            Message: Responses.MessageResponse_SUCCESS.Message,
                                            Code: Responses.MessageResponse_SUCCESS.Code
                                        }
                                        this.res.send(JSON.stringify(response));
                                    })
                                })                                
                            })
                        })                        
                    });
                }
            });
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }

    }
}

module.exports = {
    MenuSystem
}