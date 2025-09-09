export interface ISitter {
  id: number;
  userId: number;
  availableFrom: Date;
  availableTo: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISitterCreateInput {
  availableFrom: string | Date;
  availableTo: string | Date;
}

export interface ISitterUpdateInput {
  availableFrom?: string | Date;
  availableTo?: string | Date;
}

export interface ISitterRequest {
  id: number;
  sitterId: number;
  petId: number;
  userId: number; // requester
  status: "pending" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISitterRequestCreateInput {
  petId: number;
}

export interface ISitterRequestUpdateInput {
  status: "accepted" | "rejected";
}
