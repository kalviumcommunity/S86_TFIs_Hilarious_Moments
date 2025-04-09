const express = require('express');
const Scene = require('./models/Scene');
const router = express.Router();


router.post('/scenes', async (req, res) => {
  try {
    const newScene = new Scene(req.body);
    await newScene.save();
    res.status(201).json(newScene);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/scenes', async (req, res) => {
  try {
    const scenes = await Scene.find();
    res.json(scenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/scenes/:id', async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.id);
    scene ? res.json(scene) : res.status(404).json({ message: "Scene not found" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});


router.put('/scenes/:id', async (req, res) => {
  try {
    const updatedScene = await Scene.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updatedScene ? res.json(updatedScene) : res.status(404).json({ message: "Scene not found" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});


router.delete('/scenes/:id', async (req, res) => {
  try {
    const deletedScene = await Scene.findByIdAndDelete(req.params.id);
    deletedScene ? res.status(204).send() : res.status(404).json({ message: "Scene not found" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

module.exports = router;
