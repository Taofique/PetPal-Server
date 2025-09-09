import { Post } from "../models/index.js";
import type { IPostCreateInput, IPostUpdateInput } from "../types/feedPost.js";

// Create post
export const createPostService = async (
  userId: number,
  data: IPostCreateInput
) => {
  const post = await Post.create({
    userId,
    petId: data.petId ?? null,
    content: data.content,
  });
  return post;
};

// Get posts (with pagination)
export const getPostsService = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { rows: posts, count } = await Post.findAndCountAll({
    order: [["created_at", "DESC"]],
    limit,
    offset,
    include: ["user", "pet"],
  });
  return { posts, total: count, page, totalPages: Math.ceil(count / limit) };
};

// Update post
export const updatePostService = async (
  userId: number,
  postId: number,
  updates: IPostUpdateInput
) => {
  const post = await Post.findOne({ where: { id: postId, userId } });
  if (!post) throw new Error("Post not found");

  if (updates.content !== undefined) post.content = updates.content;

  await post.save();
  return post;
};

// Delete post
export const deletePostService = async (userId: number, postId: number) => {
  const post = await Post.findOne({ where: { id: postId, userId } });
  if (!post) throw new Error("Post not found");

  await post.destroy();
  return true;
};
