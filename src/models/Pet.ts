import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

// Pet model attributes
interface PetAttributes {
  id: number;
  ownerId: number;
  nickname: string;
  species: string;
  nextFeed: Date | null;
  nextVet: Date | null;
  photo: string | null;
}

// pet creation type without id since auto
interface PetCreationAttributes extends Optional<PetAttributes, 'id'> {}

class Pet extends Model<PetAttributes, PetCreationAttributes> implements PetAttributes {
  public id!: number;
  public ownerId!: number;
  public nickname!: string;
  public species!: string;
  public nextFeed!: Date | null;
  public nextVet!: Date | null;
  public photo!: string | null;
}

Pet.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    nickname: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    nextFeed: { type: DataTypes.DATE },
    nextVet: { type: DataTypes.DATE },
    photo: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets'
  }
);

export default Pet;
