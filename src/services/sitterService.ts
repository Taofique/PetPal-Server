import { Sitter, SitterRequest } from "../models/index.js";
import type {
  ISitterCreateInput,
  ISitterUpdateInput,
  ISitterRequestCreateInput,
  ISitterRequestUpdateInput,
} from "../types/sitter.js";

// Create a new sitter profile
export const createSitterService = async (
  userId: number,
  data: ISitterCreateInput
) => {
  if (!data.availableFrom || !data.availableTo) {
    throw new Error(
      "availableFrom and availableTo are required to create a sitter"
    );
  }

  const sitter = await Sitter.create({
    userId,
    availableFrom: new Date(data.availableFrom),
    availableTo: new Date(data.availableTo),
  });

  return sitter;
};

// Update existing sitter profile
export const updateSitterService = async (
  userId: number,
  data: ISitterUpdateInput
) => {
  const sitter = await Sitter.findOne({ where: { userId } });
  if (!sitter) throw new Error("Sitter profile not found");

  if (data.availableFrom !== undefined)
    sitter.availableFrom = new Date(data.availableFrom);
  if (data.availableTo !== undefined)
    sitter.availableTo = new Date(data.availableTo);

  await sitter.save();
  return sitter;
};

// Get sitter profile by userId
export const getSitterByUserService = async (userId: number) => {
  return await Sitter.findOne({ where: { userId } });
};

// Create a new sitter request
export const createSitterRequestService = async (
  userId: number,
  sitterId: number,
  data: ISitterRequestCreateInput
) => {
  const request = await SitterRequest.create({
    userId,
    sitterId,
    petId: data.petId,
  });
  return request;
};

// Update an existing sitter request
export const updateSitterRequestService = async (
  requestId: number,
  updates: ISitterRequestUpdateInput
) => {
  const request = await SitterRequest.findByPk(requestId);
  if (!request) throw new Error("Request not found");

  if (updates.status !== undefined) request.status = updates.status;

  await request.save();
  return request;
};

// Get all requests for a specific sitter
export const getRequestsForSitterService = async (sitterId: number) => {
  return await SitterRequest.findAll({
    where: { sitterId },
    order: [["createdAt", "DESC"]],
  });
};

// Get all requests made by a specific user
export const getRequestsByUserService = async (userId: number) => {
  return await SitterRequest.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};
