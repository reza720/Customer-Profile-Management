import * as excelService from "./excel.service.js";

// get photo
export async function getPhoto(req, res, next) {
    try{
        const photo = await excelService.getPhoto(req.params.customerId);
        res.status(200).json({
            success: true,
            message: "Photo fetched",
            photo
        });
    }
    catch(err){
        next(err);
    }
};

// get customers
export async function getCustomers(req, res, next) {
    try{
        const customers = await excelService.getCustomers();
        res.status(200).json({
            success: true,
            message: "Customer fetched",
            customers
        });
    }
    catch(err){
        next(err);
    }
};