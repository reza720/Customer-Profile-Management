import * as excelService from "./service.js";

// get customer for excel
export async function getCustomersForExcel(req, res, next) {
    try{
        const customers = await excelService.getCustomersForExcel();
        res.status(200).json({
            success: true,
            message: "Customers fetched",
            customers
        });
    }
    catch(err){
        next(err);
    }
};

