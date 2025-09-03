import { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import type { IUserCreateInput } from "../types/user.js";
import { getUserById, updateUserService } from "../services/userService.js";

// Get Current Logged-in User
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await getUserById(req.userId);

    return res.status(200).json({ user });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update Current Logged-in User

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const updates = req.body as Partial<IUserCreateInput>;
    const user = await updateUserService(req.userId, updates);

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
