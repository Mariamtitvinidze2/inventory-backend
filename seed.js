import dotenv from "dotenv";
dotenv.config();

import {
  sequelize,
  InventoryModelExport as InventoryModel,
  LocationModelExport as LocationModel,
} from "./models/index.js";
import { faker } from "@faker-js/faker";

const LOCATIONS = [
  "Main Office",
  "Cavea Galleria",
  "Cavea Tbilisi Mall",
  "Cavea East Point",
  "Cavea City Mall",
];

const TOTAL = 500000;

async function seed() {
  await sequelize.sync({ force: true });
  console.log("DB synced");

  await LocationModel.bulkCreate(LOCATIONS.map((name) => ({ name })));

  for (let i = 0; i < TOTAL; i++) {
    await InventoryModel.create({
      name: faker.commerce.productName(),
      price: (Math.random() * 100).toFixed(2),
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    });
  }

  console.log("Done!");
  process.exit(0);
}

seed();
