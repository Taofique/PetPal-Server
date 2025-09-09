import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { ISitterRequest } from "../types/sitter.js";

type SitterRequestCreationAttributes = Optional<
  ISitterRequest,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export class SitterRequest
  extends Model<ISitterRequest, SitterRequestCreationAttributes>
  implements ISitterRequest
{
  declare id: number;
  declare sitterId: number;
  declare petId: number;
  declare userId: number;
  declare status: "pending" | "accepted" | "rejected";
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SitterRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sitterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "sitter_id",
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "pet_id",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
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
    tableName: "sitter_requests",
    modelName: "SitterRequest",
    underscored: true,
    timestamps: true,
  }
);

export default SitterRequest;
