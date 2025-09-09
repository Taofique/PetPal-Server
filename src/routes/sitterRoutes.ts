import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createSitterProfile,
  updateSitterProfile,
  getSitterProfile,
  createSitterRequest,
  updateSitterRequest,
  getRequestsForSitter,
  getRequestsByUser,
} from "../controllers/sitterController.js";

const router = Router();

router.use(authMiddleware);

router.post("/profile", createSitterProfile);
router.put("/profile", updateSitterProfile);
router.get("/profile", getSitterProfile);

router.post("/requests/:sitterId", createSitterRequest);
router.put("/requests/:requestId", updateSitterRequest);
router.get("/requests/sitter/:sitterId", getRequestsForSitter);
router.get("/requests/user", getRequestsByUser);

export default router;
