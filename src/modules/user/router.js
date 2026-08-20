import * as userController from "./controller.js";
import express from "express";
import authRequired from "../../middleware/authRequired.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.patch("/:id", userController.changeStatus); 
router.post("/login", userController.login); 
router.post("/refresh", userController.refreshAccessToken);
router.post("/logout", authRequired, userController.logout);  // authRequired
router.get("/:id", userController.getUser);   
router.get("/", userController.getUsers); 
router.delete("/:id", userController.deleteUser); 
//router.patch("/:id/reset-password");

export default router;