const Responses = require('../services/responses');
const saltedMd5 = require('salted-md5');
const {
    Op,
    DataTypes
} = require('sequelize');
//let Users = require('../data-objects/Users').Users;

Get = async (T, id) => {
    let result = {};
    try {
        await T.findByPk(id)
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
GetAll = async (T) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users')
        await T.findAll().then(rows => {
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
GetAllBy = async (T, params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users: ' + params)
        await T.findAll({
            where: params
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
Save = async (T, params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users: ' + params)
        await T.create(params).then(rows => {
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
Update = async (params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All Users: ' + params)
        await params.save().then(rows => {
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
    GetAll,
    GetAllBy,
    Get,
    Save,
    Update
}