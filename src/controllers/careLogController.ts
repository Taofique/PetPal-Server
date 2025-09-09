import { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import {
  createCareLogService,
  getLogsByPetService,
  updateCareLogService,
  deleteCareLogService,
  getStreakService,
} from "../services/careLogService.js";

import type {
  ICareLogCreateInput,
  ICareLogUpdateInput,
} from "../types/careLog.js";

// Create
export const createCareLog = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const petId = parseInt(req.params.petId, 10);
    const data = req.body as ICareLogCreateInput;
    const log = await createCareLogService(req.userId, petId, data);

    return res.status(201).json({ message: "Log created", log });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get logs by pet
export const getPetLogs = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const petId = parseInt(req.params.petId, 10);
    const logs = await getLogsByPetService(req.userId, petId);

    return res.status(200).json({ logs });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update log
export const updateCareLog = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const logId = parseInt(req.params.id, 10);
    const updates = req.body as ICareLogUpdateInput;
    const log = await updateCareLogService(req.userId, logId, updates);

    return res.status(200).json({ message: "Log updated", log });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Delete log
export const deleteCareLog = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const logId = parseInt(req.params.id, 10);
    await deleteCareLogService(req.userId, logId);

    return res.status(200).json({ message: "Log deleted" });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get streak
export const getStreak = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const petId = parseInt(req.params.petId, 10);
    const streak = await getStreakService(req.userId, petId);

    return res.status(200).json({ streak });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
