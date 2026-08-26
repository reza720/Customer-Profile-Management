import userRouter from "../modules/auth/router.js";
import customerRouter from "../modules/customer/router.js";

import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);

export default router;