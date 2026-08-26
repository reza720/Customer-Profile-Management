import userRouter from "../modules/user/router.js";
import customerRouter from "../modules/customer/router.js";
import googleSheetRouter from "../modules/googleSheet/googleSheet.router.js";

import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/google-sheet/customers", googleSheetRouter);


export default router;