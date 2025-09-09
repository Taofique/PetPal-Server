import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import { IUser } from "../types/user.js";

interface UserCreationAttributes
  extends Optional<IUser, "id" | "createdAt" | "updatedAt" | "imageUrl"> {}

export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare imageUrl?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

export default User;
