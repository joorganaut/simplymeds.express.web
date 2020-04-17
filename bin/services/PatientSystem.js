//const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const T = require('../data-access/BusinessObjectDAO')
let Patients = require('../data-objects/Patient').Patient
let ObjectProcessor = require('../data-objects/ObjectProcessor')
class PatientSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async RetrieveAllPatients() {
        var response;
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc',
            }
            
            var data = await T.GetAll(Patients, params);
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
    async UpdatePatientDetails(){
        var response;
        var obj;
        try {
            await T.Get(Patients, this.req.body.ID).then(data=>{
                obj = data;
            })
            var processor = new ObjectProcessor()
            obj = processor.MapModelFromObject(obj, this.req.body)
            await T.Update(obj, this.req.body).then(data=>{
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
    async RetrievePatientByUserID() {
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
            params.query = {UserID : this.req.body.UserID};
            await T.GetAllBy(Patients, params).then(data=>{
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