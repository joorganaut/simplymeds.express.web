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
            await T.GetAllNoPaging(Roles).then(async data => {
                result.RoleData = data;
                data.map(async r => {
                    await T.GetAllByNoPaging(RFunctions, {
                        RoleID: r.ID
                    }).then(async data => {
                        r.RFunctionData = data;
                    })
                })
                await T.GetAllNoPaging(UFunctions).then(async data => {
                    result.UFunctionData = data;                                
                })
                response = {
                    records: result,
                    Message: Responses.MessageResponse_SUCCESS.Message,
                    Code: Responses.MessageResponse_SUCCESS.Code
                }
                this.res.send(JSON.stringify(response));
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
            await T.Get(Roles, this.req.body.ID).then(async data => {
                if (data != null) {
                    await T.GetAllByNoPaging(UserRoles, {UserID : data.ID}).then(async data => {
                        result.RoleData = data;
                        data.forEach(async x=>{
                            await T.GetAllByNoPaging(RFunctions, {RoleID : x.RoleID}).then(async data => {
                                result.RFunctionData = data;
                                data.forEach(async x=>{
                                    await T.GetAllByNoPaging(UFunctions, {ID : x.FunctionID}).then(async data => {
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