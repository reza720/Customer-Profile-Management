import userRouters from "../modules/user/router.js";
import customerRouters from "../modules/customer/router.js";
import express from "express";

const router = express.Router();

router.use("/users", userRouters);
router.use("/customers", customerRouters);


export default router;