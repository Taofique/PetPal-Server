export interface IPost {
  id: number;
  userId: number;
  petId?: number | null;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostCreateInput {
  content: string;
  petId?: number | null;
}

export interface IPostUpdateInput {
  content?: string;
}
