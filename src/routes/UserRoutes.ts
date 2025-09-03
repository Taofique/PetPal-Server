import Router from "express";
import { updateUser, getMe } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me/update", authMiddleware, updateUser);

export default router;
