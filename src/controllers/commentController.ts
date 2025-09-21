import { Request, Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import {
  createCommentService,
  getCommentByIdService,
  getCommentsByPetIdService,
  updateCommentService,
  deleteCommentService,
} from "../services/commentService.js";

import type { ICommentCreateInput } from "../types/comment.js";

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized User" });

    const { petId, content } = req.body;
    if (!petId || !content)
      return res.status(400).json({ message: "petId and content required" });
    const comment = await createCommentService({
      userId,
      petId: Number(petId),
      content,
    });

    return res.status(201).json(comment);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCommentsForPet = async (req: AuthRequest, res: Response) => {
  try {
    const petId = Number(req.params.petId);
    const comments = await getCommentsByPetIdService(petId);
    return res.json(comments);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized user" });

    const id = Number(req.params.id);
    const existing = await getCommentByIdService(id);
    if (!existing) return res.status(404).json({ message: "Not Found" });

    if (existing.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    const updated = await updateCommentService(id, {
      content: req.body.content,
    });
    return res.json(updated);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.params.id);
    const existing = await getCommentByIdService(id);
    if (!existing) return res.status(404).json({ message: "Not Found" });

    if (existing.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    const deleted = await deleteCommentService(id);
    return res.json({ deleted });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
