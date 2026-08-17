import * as userController from "./controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", userController.signup);
router.patch("/:id", userController.changeStatus); // authRequired
router.post("/login", userController.login); 
//router.post("/refresh");
//router.post("/logout");
//router.get("/:id");
//router.get("/");
//router.delete("/:id");

export default router;