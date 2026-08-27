import userRouter from "../modules/auth/router.js";
import customerRouter from "../modules/customer/router.js";
import excelRouter from "../modules/excel/router.js";

import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/excel", excelRouter);

export default router;