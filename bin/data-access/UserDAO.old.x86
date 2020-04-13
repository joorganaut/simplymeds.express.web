const Responses = require('../services/responses');
const saltedMd5 = require('salted-md5');
const {
    Op,
    DataTypes
} = require('sequelize');
let Users = require('../data-objects/Users').Users;

GetUser = async (id) => {
    let result = {};
    try {
        await Users.findByPk(id)
            .then(usr => {
                if (usr !== null) {
                    result = usr;
                } else {
                    throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Not a valid ID';
                }
            }).error(err => {
                throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
            })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return result;
}
GetAllUsers = async () => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users')
        await Users.findAll().then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no Users';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return result;
};
GetAllUsersByEmail = async (params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users: ' + params)
        await Users.findAll({
            where: {
                Email: params
            }
        }).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no Users';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return result;
};
SaveUser = async (params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users: ' + params)
        await Users.create(params).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to save User';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return result;
};
UpdateUser = async (params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users: ' + params)
        await params.save({//Users.upsert(params, {
            // UpsertOptions: {
            //     returning: true
            // }
        }).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to update User';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return result;
};
module.exports = {
    GetAllUsers,
    GetUser,
    GetAllUsersByEmail,
    SaveUser,
    UpdateUser
}