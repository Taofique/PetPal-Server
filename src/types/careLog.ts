export interface ICareLog {
  id: number;
  userId: number;
  petId: number;
  activity: string;
  notes?: string | null;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICareLogCreateInput {
  activity: string;
  notes?: string;
  date: string | Date;
}

export interface ICareLogUpdateInput {
  activity?: string;
  notes?: string;
  date?: string | Date;
}
