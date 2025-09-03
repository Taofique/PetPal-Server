import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { log } from "console";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
