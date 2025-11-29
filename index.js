// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { sequelize } from "./models/index.js";
// import inventoryRoutes from "./routes/inventory.js";
// import locationRoutes from "./routes/location.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/inventories", inventoryRoutes);
// app.use("/api/locations", locationRoutes);

// const PORT = process.env.PORT || 3000;
// app.get("/", (req, res) => {
//   res.json({
//     message: "Inventory API is running...",
//     status: "OK",
//     timestamp: new Date().toISOString(),
//   });
// });
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     database: "Connected",
//     timestamp: new Date().toISOString(),
//   });
// });
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: "Something went wrong!",
//     message: err.message,
//   });
// });
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Endpoint not found",
//     path: req.path,
//   });
// });
// const startServer = async () => {
//   try {
//     if (process.env.NODE_ENV !== "production") {
//       await sequelize.sync({ force: false });
//       console.log("Database connected successfully");
//     }

//     if (process.env.NODE_ENV === "production") {
//       await sequelize.authenticate();
//       console.log("Database authenticated successfully");
//     }

//     app.listen(PORT, () => {
//       console.log(`Backend running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Unable to start server:", error);
//     process.exit(1);
//   }
// };

// startServer();
// export default app;
