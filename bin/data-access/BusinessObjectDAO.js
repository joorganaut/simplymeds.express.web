const Responses = require('../services/responses');
const saltedMd5 = require('salted-md5');
const {
    Op,
    DataTypes
} = require('sequelize');
//let records = require('../data-objects/records').records;

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
GetAll = async (T, params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All records')
        await T.findAll({
            limit: params.pageSize,
            offset: params.page * params.pageSize,
            order: [
                [params.sort, params.dir]
            ],
        }).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
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
GetAll = async (T, params, count) => {
    try {
        var result = {};
        console.log('i go the hell here Get All records')
        await T.findAndCountAll({
            limit: params.pageSize,
            offset: params.page * params.pageSize,
            order: [
                [params.sort, params.dir]
            ],
        }).then(count, rows => {
            if (rows !== null) {
                result = rows;
                count = count;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return {result, count};
};
GetAllBy = async (T, params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All records: ' + params)
        await T.findAll({
            where: params.query,
            limit: params.pagingParams.pageSize,
            offset: params.pagingParams.page * params.pagingParams.pageSize,
            order: [
                [params.pagingParams.sort, params.pagingParams.dir]
            ],
        }).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
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
GetAllBy = async (T, params, count) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params)
        await T.findAndCountAll({
            where: params.query,
            limit: params.pagingParams.pageSize,
            offset: params.pagingParams.page * params.pagingParams.pageSize,
            order: [
                [params.pagingParams.sort, params.pagingParams.dir]
            ],
        }).then(res => {
            if (res !== null) {
                result = res.rows;
                count = res.count;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        })
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
        console.log(error)
    }
    return {result, count};
};
Save = async (T, params) => {
    try {
        var result = {};
        console.log('i go the hell here Get All records: ' + params)
        await T.create(params).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to save record';
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
        console.log('i go the hell here Get All records: ' + params)
        await params.save().then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to update record';
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
Delete = async(params)=>{
    try {
        var result = {};
        console.log('i go the hell here Get All records: ' + params)
        await T.destroy(params).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to delete record';
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
module.exports = {
    GetAll,
    GetAllBy,
    Get,
    Save,
    Update,
    Delete
}