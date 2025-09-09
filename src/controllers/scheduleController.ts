import { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import {
  createScheduleService,
  getSchedulesByPetService,
  updateScheduleService,
  deleteScheduleService,
} from "../services/scheduleService.js";

import type {
  IScheduleCreateInput,
  IScheduleUpdateInput,
} from "../types/schedule.js";

// Create

export const createSchedule = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const petId = parseInt(req.params.petId, 10);
    const data = req.body as IScheduleCreateInput;
    const schedule = await createScheduleService(req.userId, petId, data);

    return res
      .status(201)
      .json({ message: "Schedule created successfully", schedule });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: " Server Error" });
  }
};

// Get Schedules by pet

export const getPetSchedule = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId)
      return res.status(401).json({ message: "Unauthorized user" });

    const petId = parseInt(req.params.petId, 10);
    const schedules = await getSchedulesByPetService(req.userId, petId);

    return res.status(200).json({ schedules });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: " Server Error" });
  }
};

// Update a schedule

export const updateSchedule = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const scheduleId = parseInt(req.params.id, 10);
    const updates = req.body as IScheduleUpdateInput;
    const schedule = await updateScheduleService(
      req.userId,
      scheduleId,
      updates
    );

    return res.status(200).json({ message: "Schedule updated", schedule });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Delete a schedule

export const deleteSchedule = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const scheduleId = parseInt(req.params.id, 10);
    await deleteScheduleService(req.userId, scheduleId);

    return res.status(200).json({ message: "Schedule deleted" });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
