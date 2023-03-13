const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Marker = mongoose.model('Marker')

// router.post('/create', async (req, res, next) => {
//   const {markerType, latitude, longitude} = req.body;

//   console.log(req.body)

//   try {
//     const newMarker = new Marker({
//       markerType: markerType,
//       latitude: latitude,
//       longitude: longitude
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({message: err.message})
//   }
// })

router.post('/create', async (req, res, next) => {
  const { markerType, latitude, longitude, name, address, hours } = req.body;

  // console.log(req.body);

  try {
    const newMarker = new Marker({
      markerType: markerType,
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address,
      hours: hours
    });
    await newMarker.save();
    res.status(201).json(newMarker);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: err.message });
  }
});



router.get('/allMarkers', async (req, res) => {
    // try {
      const markers = await Marker.find();
      const markersById = {}
      markers.forEach(marker => {
        const markerObj = marker.toObject();
        markersById[marker._id] = markerObj;
      })
      // res.json(markers);
      res.json(markersById)
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Server error');
    // }
  });


router.get('/:markerId', async (req, res) => {
  const markerId = req.params.markerId

  try {
    // console.log(markerId)
    const marker = await Marker.findById(markerId)
    if (!marker) {
      return res.status(404).json({ message: "Marker not found"})
    }

    res.status(200).json(marker)
  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
  }
})


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