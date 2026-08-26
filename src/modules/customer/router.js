import * as customerController from "./controller.js";
import express from "express";
import authRequired from "../../middleware/authRequired.js";
import authRequiredForExcel from "../../middleware/apiKeyRequired.js";
import upload from "../../config/multer.js";
import apiKeyRequired from "../../middleware/apiKeyRequired.js";

const router = express.Router();

router.post("/register", 
    authRequired,
    customerController.register);
router.post("/:id/photo", 
    authRequired,
    upload.single("photo"), 
    customerController.uploadPhoto);

router.patch("/:id", 
    authRequired,
    customerController.update);
router.delete("/:id", 
    authRequired,
    customerController.deleteCustomer);

router.get("/:id",
    authRequired,
    customerController.getCustomer);
router.get("/", 
    authRequired,
    customerController.getCustomers);
router.get("/excel", 
    apiKeyRequired, 
    customerController.getCustomers)

export default router;