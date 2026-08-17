import userRouters from "../modules/user/router.js";
import express from "express";

const router = express.Router();

router.use("/users", userRouters);


export default router;