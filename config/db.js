import Sequelize from "sequelize";

export const sequelize = new Sequelize("inventory_db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
