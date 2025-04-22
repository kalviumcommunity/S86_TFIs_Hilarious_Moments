const express = require("express");
const MomentSchema = require("../models/Moment");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get all moments
router.get("/", async (req, res) => {
  try {
    const moments = await MomentSchema.find();
    res.json(moments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching moments" });
  }
});

// Create a moment
router.post("/", async (req, res) => {
  try {
    const newMoment = new MomentSchema(req.body);
    await newMoment.save();
    res.status(201).json({ success: true, moment: newMoment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vote on a moment
router.post("/:id/:type",  async (req, res) => {
  const { id, type } = req.params;
  try {
    const moment = await MomentSchema.findById(id);
    if (!moment) {
      return res.status(404).json({ message: "Moment not found" });
    }

    if (type === "upvote") {
      moment.upvotes += 1;
    } else if (type === "downvote") {
      moment.downvotes += 1;
    } else {
      return res.status(400).json({ message: "Invalid vote type" });
    }

    await moment.save();
    res.json(moment);
  } catch (err) {
    res.status(500).json({ message: "Error voting on moment" });
  }
});

module.exports = router;
