import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

//User model attributes
interface UserAttributes {
  userId: number;
  username: string;
  email: string;
  password: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}
User.init(
  {
    userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'User', tableName: 'Users' }
);

export default User;
