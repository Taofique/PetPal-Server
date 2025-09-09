import { CareLog } from "../models/index.js";
import type {
  ICareLogCreateInput,
  ICareLogUpdateInput,
} from "../types/careLog.js";

// Create log
export const createCareLogService = async (
  userId: number,
  petId: number,
  data: ICareLogCreateInput
) => {
  const log = await CareLog.create({
    userId,
    petId,
    activity: data.activity,
    notes: data.notes ?? null,
    date: new Date(data.date),
  });

  return log;
};

// Get all logs by pet
export const getLogsByPetService = async (userId: number, petId: number) => {
  return await CareLog.findAll({
    where: { userId, petId },
    order: [["date", "DESC"]],
  });
};

// Update log
export const updateCareLogService = async (
  userId: number,
  logId: number,
  updates: ICareLogUpdateInput
) => {
  const log = await CareLog.findOne({ where: { id: logId, userId } });
  if (!log) throw new Error("Care log not found");

  if (updates.activity !== undefined) log.activity = updates.activity;
  if (updates.notes !== undefined) log.notes = updates.notes;
  if (updates.date !== undefined) log.date = new Date(updates.date);

  await log.save();
  return log;
};

// Delete log
export const deleteCareLogService = async (userId: number, logId: number) => {
  const log = await CareLog.findOne({ where: { id: logId, userId } });
  if (!log) throw new Error("Care log not found");

  await log.destroy();
  return true;
};

// Get streak (consecutive days)
export const getStreakService = async (userId: number, petId: number) => {
  const logs = await CareLog.findAll({
    where: { userId, petId },
    order: [["date", "DESC"]],
  });

  if (logs.length === 0) return 0;

  let streak = 1;

  const dates = logs.map((log) => {
    const date = new Date(log.date);
    return date.toISOString().split("T")[0];
  });

  const uniqueDates = [...new Set(dates)];

  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i - 1]);
    const previousDate = new Date(uniqueDates[i]);

    const timeDiff = currentDate.getTime() - previousDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
