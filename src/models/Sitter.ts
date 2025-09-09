import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { ISitter } from "../types/sitter.js";

type SitterCreationAttributes = Optional<
  ISitter,
  "id" | "createdAt" | "updatedAt"
>;

export class Sitter
  extends Model<ISitter, SitterCreationAttributes>
  implements ISitter
{
  declare id: number;
  declare userId: number;
  declare availableFrom: Date;
  declare availableTo: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Sitter.init(
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
    availableFrom: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "available_from",
    },
    availableTo: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "available_to",
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
    tableName: "sitters",
    modelName: "Sitter",
    underscored: true,
    timestamps: true,
  }
);

export default Sitter;
