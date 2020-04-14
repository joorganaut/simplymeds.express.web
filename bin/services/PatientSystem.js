//const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const T = require('../data-access/BusinessObjectDAO')
let Patients = require('../data-objects/Patient').Patient
class PatientSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async RetrieveAllPatients() {
        var response;
        try {

            var data = await T.GetAll(Patients);
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
    async RetrievePatientByUserID() {
        var response;
        try {
            await T.GetAllBy(Patients, {UserID : this.req.body.UserID}).then(data=>{
                response = {
                    record: data,
                    count: data != null ? data.length : 0,
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
            this.res.send(JSON.stringify(response));
        }        
    }
    async RetrievePatientByID() {
        var response;
        try {
            var data = await T.Get(Patients, this.req.body.ID);
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
    async AddPatientInfo() {
        var response;
        try {
            
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
    PatientSystem
}