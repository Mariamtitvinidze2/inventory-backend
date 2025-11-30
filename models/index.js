import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import { Inventory } from "./inventory.js";
import { Location } from "./location.js";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
  }
);

const InventoryModel = Inventory(sequelize);
const LocationModel = Location(sequelize);

export const InventoryModelExport = InventoryModel;
export const LocationModelExport = LocationModel;
