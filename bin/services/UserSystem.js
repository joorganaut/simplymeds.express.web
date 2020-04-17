//const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const saltedMd5 = require('salted-md5');
const T = require('../data-access/BusinessObjectDAO')
let Users = require('../data-objects/Users').Users;
let Roles = require('../data-objects/Role').Role;
let UserRoles = require('../data-objects/UserRole').UserRole
let Patients = require('../data-objects/Patient').Patient
class UserSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async RetrieveAllUsers() {
        var response;
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc',
            }
            var data = await T.GetAll(Users, params);
            response = {
                records: data.result,
                count: data.count,
                Message: Responses.MessageResponse_SUCCESS.Message,
                Code: Responses.MessageResponse_SUCCESS.Code
            }
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }
        this.res.send(JSON.stringify(response));
    }
    async RetrieveAllUsersByEmail() {
        var response;
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc',
            }
            this.req.body.pagingParams = this.req.body.pagingParams === undefined ? params : this.req.body.pagingParams;
            params.pagingParams = this.req.body.pagingParams;
            params.query = {Email : this.req.body.Email};
            var data = await T.GetAllBy(Users, params);
            response = {
                records: data.result,
                count: data != null ? data.length : 0,
                Message: Responses.MessageResponse_SUCCESS.Message,
                Code: Responses.MessageResponse_SUCCESS.Code
            }
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }
        this.res.send(JSON.stringify(response));
    }
    async RetrieveUserByID() {
        var response;
        try {
            var data = await T.Get(Users, this.req.body.ID);
            response = {
                record: data,
                Message: Responses.MessageResponse_SUCCESS.Message,
                Code: Responses.MessageResponse_SUCCESS.Code
            }
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }
        this.res.send(JSON.stringify(response));
    }
    async RegisterUser() {
        var response;
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc',
            }
            this.req.body.pagingParams = this.req.body.pagingParams === undefined ? params : this.req.body.pagingParams;
            params.pagingParams = this.req.body.pagingParams;
            params.query = {Email : this.req.body.Email};
            var existingUser = await T.GetAllBy(Users, params);
            if (existingUser.length > 0) {
                response = {
                    Error: ` User with Email ${this.req.body.Email} already exists`,
                    Message: Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message,
                    Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
                }
            } else {
                var params = this.req.body;
                params.Password = saltedMd5(params.Password, 'Joorgi')
                await T.Save(Users, params).then(async data =>{
                    var patient = {
                        FirstName : data.FirstName,
                        LastName : data.LastName,
                        UserID : data.ID,
                        PhoneNumber : this.req.body.MobilePhoneNumber
                    }
                    await T.Save(Patients, patient).then(async ()=>{
                        var params = {
                            page : 0,
                            pageSize : 5,
                            sort : 'ID',
                            dir : 'asc',
                        }
                        this.req.body.pagingParams = this.req.body.pagingParams === undefined ? params : this.req.body.pagingParams;
                        params.pagingParams = this.req.body.pagingParams;
                        params.query = {Name : 'Customer'};
                        await T.GetAllBy(Roles, params).then(res =>{
                            if(res.result.length > 0)
                            {
                                res.result.forEach(async x=>{
                                    var userRole = {
                                        UserID : data.ID,
                                        RoleID : x.ID,
                                        Username : data.Email,
                                        RoleName : x.Name
                                    }
                                    await T.Save(UserRoles, userRole)
                                })
                            }
                            response = {
                                record: data.ID,
                                Message: Responses.MessageResponse_SUCCESS.Message,
                                Code: Responses.MessageResponse_SUCCESS.Code
                            }
                            this.res.send(JSON.stringify(response));                                                
                        })
                    })
                     //right here
                    
                });                
            }
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }
    }
    async Login() {
        var response;
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc',
            }
            this.req.body.pagingParams = this.req.body.pagingParams === undefined ? params : this.req.body.pagingParams;
            params.pagingParams = this.req.body.pagingParams;
            params.query = {Email : this.req.body.Username};
            var existingUser = await T.GetAllBy(Users, params);
            if (existingUser.result.length < 1) {
                response = {
                    Error: ` User with Username ${this.req.body.Username} does not exists`,
                    Message: Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message,
                    Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
                }
            } else {
                var params = this.req.body;
                var user = existingUser.result[0];
                params.Password = saltedMd5(params.Password, 'Joorgi')
                if (user.Password === params.Password) {

                    user.LastLoginDate = new Date().toDateString(),
                        user.NumberOfFailedAttempts = 0,
                        user.DateLastModified = new Date().toDateString()

                    await T.Update(user).then(async ()=>{
                        var params = {
                            page : 0,
                            pageSize : 5,
                            sort : 'ID',
                            dir : 'asc',
                        }
                        this.req.body.pagingParams = this.req.body.pagingParams === undefined ? params : this.req.body.pagingParams;
                        params.pagingParams = this.req.body.pagingParams;
                        params.query = {UserID : user.ID};
                        await T.GetAllBy(UserRoles, params).then(async data=>{
                            response = {
                                record: {
                                    Name : user.FullName,
                                    ID: user.ID,
                                    Roles : data.result,
                                },
                                IsAuthenticated: true,
                                Message: Responses.MessageResponse_SUCCESS.Message,
                                Code: Responses.MessageResponse_SUCCESS.Code
                            }
                        })
                    });                    
                } else {
                    user.NumberOfFailedAttempts = user.NumberOfFailedAttempts + 1;
                    user.DateLastModified = new Date().toDateString();

                    var data = await T.Update(user);
                    response = {
                        Error: 'Invalid login credentials',
                        IsAuthenticated: false,
                        Message: Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message,
                        Code: Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code
                    }
                }
            }
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }
        this.res.send(JSON.stringify(response));
    }
}

module.exports = {
    UserSystem
}