export type ScheduleStatus = "upcoming" | "done" | "missed";

export interface ISchedule {
  id: number;
  petId: number;
  ownerId: number;
  title: string;
  description: string | null | undefined;
  date: Date;
  endDate?: Date | null;
  status: ScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IScheduleCreateInput {
  title: string;
  description?: string;
  date: string | Date;
  endDate?: string | Date | null;
  status?: ScheduleStatus;
}

export interface IScheduleUpdateInput {
  title?: string;
  description?: string;
  date?: string | Date;
  endDate?: string | Date | null;
  status?: ScheduleStatus;
}
