const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Marker = mongoose.model('Marker')

router.get('/allMarkers', async (req, res) => {
    try {
      const markers = await Marker.find();
      res.json(markers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


  router.post('/markers', async (req, res) => {
    try {
      const { markerType, latitude, longitude } = req.body;
      const newMarker = new Marker({
        markerType,
        latitude,
        longitude
      });
      const savedMarker = await newMarker.save();
      res.json(savedMarker);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


module.exports = router;