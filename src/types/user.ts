export interface IUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreateInput {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
}

export interface IUserLoginInput {
  email: string;
  password: string;
}
