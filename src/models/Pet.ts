import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/index.js";
import type { IPet } from "../types/pet.js";

interface PetCreationAttributes
  extends Optional<IPet, "id" | "createdAt" | "updatedAt" | "imageUrl"> {}

class Pet extends Model<IPet, PetCreationAttributes> implements IPet {
  public id!: number;
  public name!: string;
  public nickname!: string;
  public species!: string;
  public age!: number;
  public imageUrl!: string | null;
  public ownerId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url",
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "owner_id",
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
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
    tableName: "pets",
    modelName: "Pet",
    timestamps: true,
    underscored: true,
  }
);

export default Pet;
