import { sequelize } from "../config/db.js";
import { Inventory } from "./inventory.js";
import { Location } from "./location.js";

const InventoryModel = Inventory(sequelize);
const LocationModel = Location(sequelize);

export const InventoryModelExport = InventoryModel;
export const LocationModelExport = LocationModel;
export { sequelize };
