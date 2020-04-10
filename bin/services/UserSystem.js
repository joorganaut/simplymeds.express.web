const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const saltedMd5 = require('salted-md5');
class UserSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async RetrieveAllUsers() {
        var response;
        try {
            var data = await UserDAO.GetAllUsers();
            response = {
                records: data,
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
    async RetrieveAllUsersByEmail() {
        var response;
        try {
            var data = await UserDAO.GetAllUsersByEmail(this.req.body.Email);
            response = {
                records: data,
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
            var data = await UserDAO.GetUser(this.req.body.ID);
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
            var existingUser = await UserDAO.GetAllUsersByEmail(this.req.body.Email);
            if (existingUser.length > 0) {
                response = {
                    Error: ` User with Email ${this.req.body.Email} already exists`,
                    Message: Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message,
                    Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
                }
            } else {
                var params = this.req.body;
                params.Password = saltedMd5(params.Password, 'Joorgi')
                var data = await UserDAO.SaveUser(params);
                response = {
                    record: data.ID,
                    Message: Responses.MessageResponse_SUCCESS.Message,
                    Code: Responses.MessageResponse_SUCCESS.Code
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
    async Login() {
        var response;
        try {
            var existingUser = await UserDAO.GetAllUsersByEmail(this.req.body.Username);
            if (existingUser.length < 1) {
                response = {
                    Error: ` User with Username ${this.req.body.Username} does not exists`,
                    Message: Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message,
                    Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
                }
            } else {
                var params = this.req.body;
                var user = existingUser[0];
                params.Password = saltedMd5(params.Password, 'Joorgi')
                if (user.Password === params.Password) {

                    user.LastLoginDate = new Date().toDateString(),
                        user.NumberOfFailedAttempts = 0,
                        user.DateLastModified = new Date().toDateString()

                    var data = await UserDAO.UpdateUser(user);
                    response = {
                        record: {
                            Name : data.FullName,
                        },
                        IsAuthenticated: true,
                        Message: Responses.MessageResponse_SUCCESS.Message,
                        Code: Responses.MessageResponse_SUCCESS.Code
                    }
                } else {
                    user.NumberOfFailedAttempts = user.NumberOfFailedAttempts + 1;
                    user.DateLastModified = new Date().toDateString();

                    var data = await UserDAO.UpdateUser(user);
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