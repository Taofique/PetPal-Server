import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createCareLog,
  getPetLogs,
  updateCareLog,
  deleteCareLog,
  getStreak,
} from "../controllers/careLogController.js";

const router = Router();

router.use(authMiddleware);

router.post("/pets/:petId/logs", createCareLog);
router.get("/pets/:petId/logs", getPetLogs);
router.put("/logs/:id", updateCareLog);
router.delete("/logs/:id", deleteCareLog);
router.get("/pets/:petId/streak", getStreak);

export default router;
