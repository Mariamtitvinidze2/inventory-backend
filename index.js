import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import inventoryRoutes from "./routes/inventory.js";
import locationRoutes from "./routes/location.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/inventories", inventoryRoutes);
app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 3000;

await sequelize.sync({ force: false });
console.log("Database connected successfully");

app.get("/", (req, res) => {
  res.send("Inventory API is running...");
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
