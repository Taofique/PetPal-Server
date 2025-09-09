import { Schedule } from "../models/index.js";
import type {
  IScheduleCreateInput,
  IScheduleUpdateInput,
  ScheduleStatus,
} from "../types/schedule.js";

// Creating a schedule for a pet

export const createScheduleService = async (
  ownerId: number,
  petId: number,
  data: {
    title: string;
    description?: string;
    date: string | Date;
    endDate?: string | Date | null;
    status?: ScheduleStatus;
  }
) => {
  const schedule = await Schedule.create({
    ownerId,
    petId,
    title: data.title,
    description: data.description ?? null,
    date: new Date(data.date),
    endDate: data.endDate ? new Date(data.endDate) : null,
    status: data.status,
  });

  return schedule;
};

// Get all schedules for a pet by a owner

export const getSchedulesByPetService = async (
  ownerId: number,
  petId: number
) => {
  const schedules = await Schedule.findAll({
    where: { ownerId, petId },
    order: [["date", "ASC"]],
  });

  return schedules;
};

// Update a pet schedule

export const updateScheduleService = async (
  ownerId: number,
  scheduleId: number,
  updates: {
    title?: string;
    description?: string;
    date?: string | Date;
    endDate?: string | Date | null;
    status?: ScheduleStatus;
  }
) => {
  const schedule = await Schedule.findOne({
    where: { id: scheduleId, ownerId },
  });

  if (!schedule) throw new Error("Schedule not found");

  if (updates.title !== undefined) schedule.title = updates.title;
  if (updates.description !== undefined)
    schedule.description = updates.description;
  if (updates.date !== undefined) schedule.date = new Date(updates.date);
  if (updates.endDate !== undefined) {
    schedule.endDate = updates.endDate ? new Date(updates.endDate) : null;
  }
  if (updates.status !== undefined) schedule.status = updates.status;

  schedule.save();
  return schedule;
};

// Delete schedule

export const deleteScheduleService = async (
  ownerId: number,
  scheduleId: number
) => {
  const schedule = await Schedule.findOne({
    where: { id: scheduleId, ownerId },
  });
  if (!schedule) throw new Error("Schedule not found");

  await schedule.destroy();
  return true;
};
