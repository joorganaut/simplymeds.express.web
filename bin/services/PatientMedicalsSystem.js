//const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const T = require('../data-access/BusinessObjectDAO')
let PreExistingCondition = require('../data-objects/PreExistingCondition').PreExistingCondition
class PatientMedicalsSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async RetrieveAllPatientMedicals() {
        var response;
        
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc'
            }
            var data = await T.GetAll(PreExistingCondition, params);
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
    async RetrievePatientMedicalsByPatientID() {
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
            params.query = {PatientID : this.req.body.PatientID};
            await T.GetAllBy(PreExistingCondition, params).then(data=>{
                response = {
                    record: data.result,
                    count: data.count,
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
    async RetrieveMedicalByID() {
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
    async AddMedicalInfo() {
        var response;
        try {
            var params = this.req.body;
                await T.Save(PreExistingCondition, params).then(data=>{
                    response = {
                        record: data.ID,
                        Message: Responses.MessageResponse_SUCCESS.Message,
                        Code: Responses.MessageResponse_SUCCESS.Code
                    }
                    this.res.send(JSON.stringify(response)); 
                })
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
    PatientMedicalsSystem
}