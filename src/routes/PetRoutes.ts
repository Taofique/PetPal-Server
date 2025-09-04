import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createPet,
  getMyPets,
  getPetById,
  updatePet,
  deletePet,
} from "../controllers/petController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createPet);
router.get("/", getMyPets);
router.get("/:id", getPetById);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

export default router;
