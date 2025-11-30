import { sequelize } from "../config/db.js";

import { Inventory } from "./inventory.js";
import { Location } from "./location.js";

export const InventoryModelExport = Inventory(sequelize);
export const LocationModelExport = Location(sequelize);
