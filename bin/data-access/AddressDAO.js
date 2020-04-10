const Responses = require('../services/responses')
const {
    Op,
    DataTypes
} = require('sequelize');
let Addresses = require('../data-objects/Address').Addresses;
const GetAddress = (req, res) => {
    this.ID = req.body.ID;
    try {
        console.log('i go the hell here ' + this.ID)
        Addresses.findByPk(this.ID)
            .then(usr => {
                if (usr !== null) {
                    console.log(`${JSON.stringify(usr)} Successful`);
                    const User = JSON.stringify(usr);
                    console.log(User);
                    console.log('Hello world ghost');
                    console.log(User + ' again');
                    console.log(Object.keys(Responses));
                    console.log(JSON.stringify(Responses.MessageResponse_SUCCESS))
                    res.send(JSON.stringify(Responses.MessageResponse_SUCCESS) + ' : ' + User)
                } else {
                    res.send(JSON.stringify(Responses.MessageResponse_TRANSACTION_INVALID));
                }
            }).error(err => {
                res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + err));
            })
    } catch (error) {
        res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + error));
        console.log(error)
    }
};
const GetAllAddresses = (req, res) => {
    try {
        console.log('i go the hell here ' + req)
        Addresses.findAll().then(rows => {
            if (rows !== null) {
                console.log(`${JSON.stringify(rows)} Successful`);
                const User = JSON.stringify(rows);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                res.send(JSON.stringify(Responses.MessageResponse_SUCCESS) + ' : ' + User)
            } else {
                res.send(JSON.stringify(Responses.MessageResponse_TRANSACTION_INVALID));
            }
        }).error(err => {
            res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + err));
        })
    } catch (error) {
        res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + error));
        console.log(error)
    }
};

const GetAddressByEntityAndID = (req, res) => {
    try {
        console.log('i go the hell here ' + req.body.Email)
        var email = req.body.Email;
        Addresses.findAll({
            where: {
                Email: email
            }
        }).then(rows => {
            if (rows !== null) {
                console.log(`${JSON.stringify(rows)} Successful`);
                const User = JSON.stringify(rows);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                res.send(JSON.stringify(Responses.MessageResponse_SUCCESS) + ' : ' + User)
            } else {
                res.send(JSON.stringify(Responses.MessageResponse_TRANSACTION_INVALID));
            }
        }).error(err => {
            res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + err));
        })
    } catch (error) {
        res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + error));
        console.log(error)
    }
};
const SaveAddress = (req, res) => {
    try {

        var params = req.body;
        params.Password = saltedMd5(params.Password, 'Joorgi'),
            console.log('i go the hell here ' + params.Password)
            Addresses.create(params).then(rows => {
            if (rows !== null) {
                console.log(`${JSON.stringify(rows.ID)} Successful`);
                const User = JSON.stringify(rows.ID);
                console.log(User);
                console.log('Hello world ghost');
                console.log(User + ' again');
                var ID = Number(User.toString());
                console.log(ID);
                res.send(JSON.stringify(Responses.MessageResponse_SUCCESS) + ' : ' + ID > 0 ? `Successfull-{ID : ${ID}}` : 'Failed')
            } else {
                res.send(JSON.stringify(Responses.MessageResponse_TRANSACTION_INVALID));
            }
        }).error(err => {
            res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + err));
        })
    } catch (error) {
        res.send(JSON.stringify(Responses.MessageResponse_SYSTEM_MALFUNCTION + ' ' + error));
        console.log(error)
    }
};

module.exports = {
    GetAddress,
    GetAllAddresses,
    GetAddressByEntityAndID,
    SaveAddress
}