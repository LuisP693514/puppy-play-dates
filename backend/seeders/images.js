// backend/seeders/images.js

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');

const DEFAULT_PROFILE_IMAGE_URL = 'https://puppyplaydates.s3.us-east-2.amazonaws.com/public/blank-profile-picture-gb0a817da7_1280.png'; // <- Insert the S3 URL that you copied above here

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Initialize image fields in db
const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

  console.log("Done!");
  mongoose.disconnect();
}