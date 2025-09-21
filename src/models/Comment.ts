import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { IComment, ICommentCreateInput } from "../types/comment.js";

type CommentCreationAttributes = Optional<
  IComment,
  "id" | "createdAt" | "updatedAt"
>;

export class Comment
  extends Model<IComment, CommentCreationAttributes>
  implements IComment
{
  declare id: number;
  declare content: string;
  declare userId: number;
  declare petId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "pet_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "comments",
    modelName: "Comment",
    underscored: true,
    timestamps: true,
  }
);

export default Comment;
