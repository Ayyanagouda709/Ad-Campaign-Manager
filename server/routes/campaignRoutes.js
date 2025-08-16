const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const authMiddleware = require('../middleware/authMiddleware');


// POST route
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newCampaign = new Campaign({
      ...req.body,
      user: req.user.id  // 👈 assign logged-in user's ID
    });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all campaigns
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const userCampaigns = await Campaign.find({ user: req.user.id });
    res.json(userCampaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Campaign deleted", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update campaign
router.put("/update/:id", async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Campaign updated", data: updatedCampaign });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH /api/campaigns/status/:id
router.patch('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;
