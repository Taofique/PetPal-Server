import Comment from "../models/Comment.js";
import User from "../models/User.js";
import { ICommentCreateInput } from "../types/comment.js";

export async function createCommentService(payload: ICommentCreateInput) {
  const comment = await Comment.create(payload);
  return comment;
}

export async function getCommentsByPetIdService(
  petId: number,
  opts = { limit: 20, offset: 0 }
) {
  const { limit, offset } = opts;
  return Comment.findAll({
    where: { petId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "imageUrl"], // adjust to your user fields
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });
}

export async function getCommentByIdService(id: number) {
  return Comment.findByPk(id);
}

export async function updateCommentService(
  id: number,
  data: Partial<{ content: string }>
) {
  const comment = await Comment.findByPk(id);
  if (!comment) return null;
  await comment.update(data);
  return comment;
}

export async function deleteCommentService(id: number) {
  const deleted = await Comment.destroy({ where: { id } });
  return deleted > 0;
}
