import User from "../models/User.js";
import type { IUserCreateInput, IUserLoginInput } from "../types/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is required");

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Register user
export const registerUserService = async (input: IUserCreateInput) => {
  const { name, email, password, imageUrl } = input;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
    imageUrl: imageUrl ?? null,
  });

  const token = generateToken(user.id);

  return { user, token };
};

// Login user
export const loginUserService = async (input: IUserLoginInput) => {
  const user = await User.findOne({ where: { email: input.email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(input.password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken(user.id);

  return { user, token };
};

// Get current user
export const getUserById = async (userId: number) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "imageUrl", "createdAt", "updatedAt"],
  });
  if (!user) throw new Error("User not found");
  return user;
};

// Update user
export const updateUserService = async (
  userId: number,
  updates: Partial<IUserCreateInput>
) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  if (updates.email && updates.email !== user.email) {
    const emailExists = await User.findOne({ where: { email: updates.email } });
    if (emailExists) throw new Error("Email already in use");
    user.email = updates.email;
  }

  if (updates.name) user.name = updates.name;
  if (updates.imageUrl !== undefined) user.imageUrl = updates.imageUrl;

  if (updates.password) {
    user.passwordHash = await bcrypt.hash(updates.password, 10);
  }

  await user.save();
  return user;
};
