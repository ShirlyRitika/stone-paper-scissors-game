import express from "express";
import Match from "../models/Match.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/", async (req, res) => {
  try {
    await Match.deleteMany();
    res.json({ message: "All history deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
