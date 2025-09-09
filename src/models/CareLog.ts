import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { ICareLog } from "../types/careLog.js";

type CareLogCreationAttributes = Optional<
  ICareLog,
  "id" | "createdAt" | "updatedAt"
>;

export class CareLog
  extends Model<ICareLog, CareLogCreationAttributes>
  implements ICareLog
{
  declare id: number;
  declare userId: number;
  declare petId: number;
  declare activity: string;
  declare notes: string | null;
  declare date: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

CareLog.init(
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
      allowNull: false,
      field: "pet_id",
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: "care_logs",
    modelName: "CareLog",
    underscored: true,
    timestamps: true,
  }
);

export default CareLog;
