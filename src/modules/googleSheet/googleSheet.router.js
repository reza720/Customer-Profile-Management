import express from "express";
import * as googlesheetController from "./googleSheet.controller.js";
import authRequired from "./googleSheet.authRequired.js";

const router = express.Router();

router.get("/", 
    googlesheetController.getPhoto);
router.get("/:customerId/photo", 
    googlesheetController.getCustomers);

export default router;