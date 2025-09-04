import { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import type { IPetCreateInput, IPetUpdateInput } from "../types/pet.js";
import { Pet } from "../models/index.js";
import {
  createPetService,
  getPetsByOwnerService,
  getPetByIdService,
  updatePetService,
  deletePetService,
} from "../services/petService.js";

// Create a new Pet
export const createPet = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const data = req.body as IPetCreateInput;
    const pet = await createPetService(req.userId, data);

    return res.status(201).json({
      message: "Pet created successfully",
      pet,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get all Pets of current user
export const getMyPets = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const pets = await getPetsByOwnerService(req.userId);

    return res.status(200).json({ pets });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get single Pet by ID
export const getPetById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const petId = parseInt(req.params.id, 10);
    const pet = await getPetByIdService(req.userId, petId);

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    return res.status(200).json({ pet });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update Pet
export const updatePet = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const petId = parseInt(req.params.id, 10);
    const updates = req.body as IPetUpdateInput;

    const pet = await updatePetService(req.userId, petId, updates);

    return res.status(200).json({
      message: "Pet updated successfully",
      pet,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Delete Pet
export const deletePet = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const petId = parseInt(req.params.id, 10);
    await deletePetService(req.userId, petId);

    return res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
