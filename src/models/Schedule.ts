import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { ISchedule } from "../types/schedule.js";

interface ScheduleCreationAttributes
  extends Optional<
    ISchedule,
    | "id"
    | "ownerId"
    | "createdAt"
    | "updatedAt"
    | "status"
    | "description"
    | "endDate"
  > {}

export class Schedule
  extends Model<ISchedule, ScheduleCreationAttributes>
  implements ISchedule
{
  declare id: number;
  declare petId: number;
  declare ownerId: number;
  declare title: string;
  declare description: string | null;
  declare date: Date;
  declare endDate?: Date | null;
  declare status: "upcoming" | "done" | "missed";
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "pet_id",
      references: { model: "pets", key: "id" },
      onDelete: "CASCADE",
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "owner_id",
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "end_date",
    },
    status: {
      type: DataTypes.ENUM("upcoming", "done", "missed"),
      allowNull: false,
      defaultValue: "upcoming",
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
    tableName: "schedules",
    modelName: "Schedule",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["pet_id", "date"] },
      { fields: ["owner_id", "date"] },
      { fields: ["status"] },
    ],
  }
);

export default Schedule;
