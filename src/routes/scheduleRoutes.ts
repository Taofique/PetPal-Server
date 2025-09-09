import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

import {
  createSchedule,
  updateSchedule,
  getPetSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

const router = Router();

router.use(authMiddleware);

router.get("/pets/:petId/schedule", getPetSchedule);
router.post("/pets/:petId/schedule", createSchedule);
router.put("/update/:id", updateSchedule);
router.delete("/delete/:id", deleteSchedule);

export default router;
