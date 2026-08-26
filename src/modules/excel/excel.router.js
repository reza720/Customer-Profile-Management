import express from "express";
import * as excelController from "./excel.controller.js";
import authRequired from "./excel.authRequired.js";

const router = express.Router();

router.get("/", 
    excelController.getPhoto);
router.get("/:customerId/photo", 
    excelController.getCustomers);

export default router;