import { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import type {
  ISitterCreateInput,
  ISitterUpdateInput,
  ISitterRequestCreateInput,
  ISitterRequestUpdateInput,
} from "../types/sitter.js";
import {
  createSitterService,
  updateSitterService,
  getSitterByUserService,
  createSitterRequestService,
  updateSitterRequestService,
  getRequestsForSitterService,
  getRequestsByUserService,
} from "../services/sitterService.js";

// Create sitter profile
export const createSitterProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const data = req.body as ISitterCreateInput;

    const sitter = await createSitterService(req.userId, data);
    return res.status(201).json({ message: "Sitter profile created", sitter });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update sitter profile
export const updateSitterProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const data = req.body as ISitterUpdateInput;

    const sitter = await updateSitterService(req.userId, data);
    return res.status(200).json({ message: "Sitter profile updated", sitter });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get sitter profile
export const getSitterProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const sitter = await getSitterByUserService(req.userId);
    if (!sitter)
      return res.status(404).json({ message: "Sitter profile not found" });

    return res.status(200).json({ sitter });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Create sitter request
export const createSitterRequest = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const sitterId = parseInt(req.params.sitterId, 10);
    const data = req.body as ISitterRequestCreateInput;

    const request = await createSitterRequestService(
      req.userId,
      sitterId,
      data
    );
    return res.status(201).json({ message: "Sitter request created", request });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update sitter request
export const updateSitterRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = parseInt(req.params.requestId, 10);
    const data = req.body as ISitterRequestUpdateInput;

    const request = await updateSitterRequestService(requestId, data);
    return res.status(200).json({ message: "Sitter request updated", request });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get all requests for a sitter
export const getRequestsForSitter = async (req: AuthRequest, res: Response) => {
  try {
    const sitterId = parseInt(req.params.sitterId, 10);
    const requests = await getRequestsForSitterService(sitterId);
    return res.status(200).json({ requests });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get all requests made by the logged-in user
export const getRequestsByUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const requests = await getRequestsByUserService(req.userId);
    return res.status(200).json({ requests });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
