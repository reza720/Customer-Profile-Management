import * as customerService from "./service.js";

// register
// req: from body
// res: status, json(success, message, returned data)
export async function register(req, res, next) {
    try{
        const customer = await customerService.register(req.body);
        res.status(201).json({
            success: true,
            message: "Customer registered",
            customer
        });
    }
    catch(err){
        next(err);
    }
};
// upload photo
// req: customerId from params, file from body.file
// res:status, json(success, message, returned data)
export async function uploadPhoto(req, res, next) {
    try{
        const customer = await customerService.uploadPhoto(req.params.id, req.file);
        res.status(200).json({
            success: true,
            message: "Photo uploaded",
            customer
        });
    }
    catch(err){
        next(err);
    }
};
// update customer
// req: customerId from params, data from body
// res: status, json(success, message, returned data)
export async function update(req, res, next) {
    try{
        const customer = await customerService.update(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Customer updated",
            customer
        });
    }catch(err){
        next(err);
    }
};
// delete customer
// req: customerId from params
// res: status, json(success, message)

// get customer
// req: customerId from params
// res: status, json(success, message, returned data)

// get photo
// req: from params
// res: status, json(success, message, returned data)

// get customers
// req: from req.query
// res: status, json(success, message, returned data)
