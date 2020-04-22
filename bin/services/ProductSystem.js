//const UserDAO = require('../data-access/UserDAO');
const Responses = require('../services/responses');
const T = require('../data-access/BusinessObjectDAO')
let Products = require('../data-objects/Product').Product
let BusinessImages = require('../data-objects/BusinessImage').BusinessImage
let ObjectProcessor = require('../data-objects/ObjectProcessor')
class ProductSystem {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async RetrieveAllProducts() {
        var response;
        try {
            var params = {
                page : 0,
                pageSize : 5,
                sort : 'ID',
                dir : 'asc',
            }
            
            await T.GetAll(Products, params).then(async data=>{
                data.result.map(async p=>{
                    await T.FindOne(BusinessImages, {ImageEntityID : p.ID, ImageEntity : 'Product'}).then(res=>{
                        p.Image = res;
                    })
                })
            });
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
    async UpdateProductInfo(){
        var response;
        var obj;
        try {
            await T.Get(Products, this.req.body.ID).then(data=>{
                obj = data;
            })
            var processor = new ObjectProcessor()
            obj = processor.MapModelFromObject(obj, this.req.body)
            await T.Update(obj).then(async data=>{
                await T.FindOne(BusinessImages, {ImageEntityID : obj.ID, ImageEntity : 'Product'}).then(async res=>{
                    res.ImageString = this.req.body.ImageString;
                    await T.Update(res).then(r=>{
                        data.Image = r
                        response = {
                            record: data,
                            count: data != null ? data.length : 0,
                            Message: Responses.MessageResponse_SUCCESS.Message,
                            Code: Responses.MessageResponse_SUCCESS.Code
                        }
                        this.res.send(JSON.stringify(response));
                    })
                })                
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
    async RetrieveProducts() {
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
            await T.GetAllBy(Products, params).then(async data=>{
                data.result.map(async p=>{
                    await T.FindOne(BusinessImages, {ImageEntityID : p.ID, ImageEntity : 'Product'}).then(res=>{
                        p.Image = res;
                    })
                })
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
    async RetrieveProductByID() {
        var response;
        try {
            await T.Get(Products, this.req.body.ID).then(async data=>{
                await T.FindOne(BusinessImages, {ImageEntityID : p.ID, ImageEntity : 'Product'}).then(res=>{
                    data.Image = res;
                    response = {
                        record: data,
                        Message: Responses.MessageResponse_SUCCESS.Message,
                        Code: Responses.MessageResponse_SUCCESS.Code
                    }
                })
            })
        } catch (error) {
            response = {
                Error: error.message,
                Message: Responses.MessageResponse_SYSTEM_MALFUNCTION.Message,
                Code: Responses.MessageResponse_SYSTEM_MALFUNCTION.Code
            }
        }
        this.res.send(JSON.stringify(response));
    }
    async AddProductInfo() {
        var response;
        try {
            var ImageString = this.req.body.ImageString;
            this.req.body.ImageString = null;
            await T.Save(Products, this.req.body).then(async data=>{
                await T.Save(BusinessImages, {ImageEntityID : data.ID, ImageString : ImageString, ImageEntity : 'Product'}).then(res=>{
                    //data.Image = res.ImageString;
                    response = {
                        record: data,
                        Message: Responses.MessageResponse_SUCCESS.Message,
                        Code: Responses.MessageResponse_SUCCESS.Code
                    }
                    this.res.send(JSON.stringify(response));
                })
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
    ProductSystem
}