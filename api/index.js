// api/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// მარტივი მონაცემები
const mockData = {
  inventories: [
    { id: "1", name: "პროდუქტი 1", price: 10.99, location: "მთავარი ოფისი" },
    { id: "2", name: "პროდუქტი 2", price: 15.5, location: "კავეა გალერია" },
  ],
  locations: [
    { id: "1", name: "მთავარი ოფისი" },
    { id: "2", name: "კავეა გალერია" },
  ],
};

// ენდპოინტები
app.get("/", (req, res) => {
  res.json({
    message: "✅ Inventory API მუშაობს!",
    status: "OK",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Healthy" });
});

app.get("/api/inventories", (req, res) => {
  res.json({
    items: mockData.inventories,
    total: mockData.inventories.length,
    page: 1,
    pageSize: 20,
  });
});

app.get("/api/locations", (req, res) => {
  res.json(mockData.locations);
});

app.get("/api/inventories/stats", (req, res) => {
  res.json([
    { location: "მთავარი ოფისი", count: 100, totalPrice: 5000 },
    { location: "კავეა გალერია", count: 50, totalPrice: 2500 },
  ]);
});

// Vercel-ისთვის
module.exports = app;
