export interface IPet {
  id: number;
  name: string;
  nickname: string;
  species: string;
  age: number;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPetCreateInput {
  name: string;
  nickname: string;
  species: string;
  age: number;
}

export interface IPetUpdateInput {
  name?: string;
  nickname?: string;
  species?: string;
  age?: number;
}
