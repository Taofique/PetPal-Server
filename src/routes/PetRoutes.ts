import express from "express";
import * as PetController from "../controllers/PetController";

import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Route to add a new pet (with photo upload)
router.post("/pets", authMiddleware, PetController.addPet); // 'photo' is the field name in the form

// Route to update pet profile (with photo upload)
router.put("/pets/:id", authMiddleware, PetController.updatePet);

//get all pets
router.get("/pets", authMiddleware, PetController.getPets);

// get a specific pet by ID
router.get("/pets/:id", authMiddleware, PetController.getPetById);

export default router;
