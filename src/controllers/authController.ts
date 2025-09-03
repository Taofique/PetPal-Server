import { Request, Response } from "express";
import type { IUserCreateInput, IUserLoginInput } from "../types/user.js";
import {
  registerUserService,
  loginUserService,
} from "../services/userService.js";

// Register User

export const registerUser = async (req: Request, res: Response) => {
  try {
    const input = req.body as IUserCreateInput;
    const { user, token } = await registerUserService(input);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
      token,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Login User

export const loginUser = async (req: Request, res: Response) => {
  try {
    const input = req.body as IUserLoginInput;
    const { user, token } = await loginUserService(input);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
      token,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
