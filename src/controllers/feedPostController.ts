import { Response } from "express";
import type { AuthRequest } from "../types/authRequest.js";
import {
  createPostService,
  getPostsService,
  updatePostService,
  deletePostService,
} from "../services/feedPostService.js";
import type { IPostCreateInput, IPostUpdateInput } from "../types/feedPost.js";

// Create post
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const data = req.body as IPostCreateInput;
    const post = await createPostService(req.userId, data);

    return res.status(201).json({ message: "Post created", post });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Get posts (paginated)
export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getPostsService(page, limit);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Update post
export const updatePost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const postId = parseInt(req.params.id, 10);
    const updates = req.body as IPostUpdateInput;
    const post = await updatePostService(req.userId, postId, updates);

    return res.status(200).json({ message: "Post updated", post });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// Delete post
export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const postId = parseInt(req.params.id, 10);
    await deletePostService(req.userId, postId);

    return res.status(200).json({ message: "Post deleted" });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
