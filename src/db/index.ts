import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

export const sequelize = new Sequelize(
  String(DB_NAME),
  String(DB_USER),
  String(DB_PASS),
  {
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
    define: {
      underscored: true,
      timestamps: true,
    },
  }
);

export default sequelize;
