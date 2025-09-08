import { Pet } from "../models/index.js";
import { User } from "../models/index.js";
import type { IPetCreateInput, IPetUpdateInput } from "../types/pet.js";

// Create a Pet
export const createPetService = async (
  ownerId: number,
  data: IPetCreateInput
) => {
  const existingPet = await Pet.findOne({
    where: { ownerId, nickname: data.nickname },
  });
  if (existingPet) throw new Error("Nickname already used by this owner");

  const pet = await Pet.create({
    ...data,
    ownerId,
  });

  return pet;
};

// Get all Pets of an owner
// Get all Pets of an owner with pagination
export const getPetsByOwnerService = async (
  ownerId: number,
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit;

  const { count, rows: pets } = await Pet.findAndCountAll({
    where: { ownerId },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    total: count,
    page,
    pageSize: limit,
    pets,
  };
};

// Get single Pet by ID (owner restricted)
export const getPetByIdService = async (ownerId: number, petId: number) => {
  const pet = await Pet.findOne({ where: { id: petId, ownerId } });
  return pet;
};

// Update a Pet (owner restricted)
export const updatePetService = async (
  ownerId: number,
  petId: number,
  updates: IPetUpdateInput
) => {
  const pet = await Pet.findOne({ where: { id: petId, ownerId } });
  if (!pet) throw new Error("Pet not found");

  if (updates.nickname && updates.nickname !== pet.nickname) {
    const nicknameExists = await Pet.findOne({
      where: { ownerId, nickname: updates.nickname },
    });
    if (nicknameExists) throw new Error("Nickname already in use");
    pet.nickname = updates.nickname;
  }

  if (updates.name !== undefined) pet.name = updates.name;
  if (updates.species !== undefined) pet.species = updates.species;
  if (updates.age !== undefined) pet.age = updates.age;
  if (updates.imageUrl !== undefined) pet.imageUrl = updates.imageUrl;

  await pet.save();
  return pet;
};

// Delete a Pet (owner restricted)
export const deletePetService = async (ownerId: number, petId: number) => {
  const pet = await Pet.findOne({ where: { id: petId, ownerId } });
  if (!pet) throw new Error("Pet not found");

  await pet.destroy();
  return true;
};
