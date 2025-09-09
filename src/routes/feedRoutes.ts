import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/feedPostController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createPost);
router.get("/", getPosts); // ?page=1&limit=10
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
