import * as googlesheetService from "./googleSheet.service.js";

// get photo
export async function getPhoto(req, res, next) {
    try{
        const photo = await googlesheetService.getPhoto(req.params.customerId);
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
        const customers = await googlesheetService.getCustomers();
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