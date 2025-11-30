import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import inventoryRoutes from "./routes/inventory.js";
import locationRoutes from "./routes/location.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/inventories", inventoryRoutes);
app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Hello Vercel!"));
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
};

startServer();

export default app;
