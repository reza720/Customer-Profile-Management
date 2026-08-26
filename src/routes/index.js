import userRouter from "../modules/user/router.js";
import customerRouter from "../modules/customer/router.js";
import excelRouter from "../modules/excel/excel.router.js";

import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/excel/customers", excelRouter);


export default router;