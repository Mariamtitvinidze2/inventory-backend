import express from "express";
import { InventoryModelExport as InventoryModel } from "../models/index.js";
import { sequelize } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const location = req.query.location;
    const sort = req.query.sort || "name";
    const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const where =
      location && location !== "all" && location !== "" ? { location } : {};

    const { count, rows } = await InventoryModel.findAndCountAll({
      where,
      order: [[sort, order]],
      limit,
      offset,
    });

    res.json({
      items: rows,
      total: count,
      page,
      pageSize: limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/stats", async (req, res) => {
  try {
    console.log("Fetching statistics...");
    const totalCountResult = await InventoryModel.findOne({
      attributes: [
        [sequelize.fn("COUNT", "*"), "totalCount"],
        [sequelize.fn("SUM", sequelize.col("price")), "totalPrice"],
      ],
    });

    const totalCount =
      parseInt(totalCountResult.getDataValue("totalCount")) || 0;
    const totalPrice =
      parseFloat(totalCountResult.getDataValue("totalPrice")) || 0;

    console.log("Total count from database:", totalCount);
    console.log("Total price from database:", totalPrice);

    const stats = await InventoryModel.findAll({
      attributes: [
        "location",
        [sequelize.fn("COUNT", "*"), "count"],
        [sequelize.fn("SUM", sequelize.col("price")), "totalPrice"],
      ],
      group: ["location"],
      order: [["location", "ASC"]],
    });

    console.log("Location stats:", JSON.stringify(stats, null, 2));

    const formattedStats = stats.map((stat) => ({
      location: stat.getDataValue("location"),
      count: parseInt(stat.getDataValue("count")) || 0,
      totalPrice: parseFloat(stat.getDataValue("totalPrice")) || 0,
    }));
    const sumOfLocationCounts = formattedStats.reduce(
      (sum, stat) => sum + stat.count,
      0
    );
    console.log("Sum of location counts:", sumOfLocationCounts);
    console.log("Total count from database:", totalCount);

    res.json({
      stats: formattedStats,
      totalCount: totalCount,
      totalPrice: totalPrice,
    });
  } catch (err) {
    console.error("GET /inventories/stats error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, location } = req.body;
    const priceNum = Number(price);

    if (!name || Number.isNaN(priceNum) || !location) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const item = await InventoryModel.create({
      name,
      price: priceNum,
      location,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("POST /inventories error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await InventoryModel.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /inventories error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
