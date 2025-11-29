import express from "express";
import {
  LocationModelExport as LocationModel,
  InventoryModelExport as InventoryModel,
} from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const locations = await LocationModel.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name"],
    });
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Location name is required" });
    }

    const location = await LocationModel.create({ name: name.trim() });
    res.status(201).json(location);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Location name already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Location name is required" });
    }

    const location = await LocationModel.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    await location.update({ name: name.trim() });
    res.json(location);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Location name already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const location = await LocationModel.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    const inventoryCount = await InventoryModel.count({
      where: { location: location.name },
    });

    if (inventoryCount > 0) {
      return res.status(400).json({
        error: `Cannot delete location. There are ${inventoryCount} inventory items associated with this location.`,
      });
    }

    await location.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
