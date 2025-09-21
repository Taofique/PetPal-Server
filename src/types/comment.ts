export interface IComment {
  id: number;
  content: string;
  userId: number;
  petId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentCreateInput {
  content: string;
  userId: number;
  petId: number;
}
