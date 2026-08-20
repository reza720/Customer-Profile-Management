import express from "express";
import authRequired from "../../middleware/authRequired.js";

const router = express.Router();

router.post("/register", authRequired);
router.post("/:id/photo", authRequired);
router.get("/:id/photo", authRequired);
router.get("/", authRequired);
router.get("/:id", authRequired);
router.patch("/:id", authRequired);
router.delete("/:id", authRequired);

export default router;