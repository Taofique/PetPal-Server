import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { IPost } from "../types/feedPost.js";

type PostCreationAttributes = Optional<IPost, "id" | "createdAt" | "updatedAt">;

export class Post
  extends Model<IPost, PostCreationAttributes>
  implements IPost
{
  declare id: number;
  declare userId: number;
  declare petId: number | null;
  declare content: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "pet_id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "posts",
    modelName: "Post",
    underscored: true,
    timestamps: true,
  }
);

export default Post;
