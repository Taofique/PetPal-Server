import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForPet,
} from "../controllers/commentController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, createComment);
router.get("/pet/:petId", authMiddleware, getCommentsForPet);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
