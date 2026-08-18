import * as userController from "./controller.js";
import express from "express";
import authRequired from "../../middleware/authRequired.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.patch("/:id", userController.changeStatus); 
router.post("/login", userController.login); 
router.post("/refresh", userController.refreshAccessToken);
//router.post("/logout");  // authRequired
//router.get("/:id");   
//router.get("/"); 
//router.delete("/:id"); 

export default router;