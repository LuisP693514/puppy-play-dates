const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const DEFAULT_PROFILE_IMAGE_URL = "https://puppyplaydates.s3.us-east-2.amazonaws.com/public/animal-g765307ffb_1280.png"
const Friend = require('./../../models/Friend')
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const Date = require('../../models/Date')

const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');


router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const profileImageUrl = req.file ?
    await singleFileUpload({ file: req.file, public: true }) :
    DEFAULT_PROFILE_IMAGE_URL;

  const newUser = new User({
    username: req.body.username,
    profileImageUrl,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
      }
      catch (err) {
        next(err);
      }
    })
  });
});

router.post('/login', singleMulterUpload(""), validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email,
    longitude: req.user.longitude,
    latitude: req.user.latitude
  });
});

// /api/users/all grabs all the users and exludes the password from the request
router.get('/all', async (req, res, next) => {
  const users = await User.find()
  const usersById = {}
  users.forEach(user => {
    const userObj = user.toObject();
    delete userObj.hashedPassword;
    usersById[user._id] = userObj;
  });
  res.json(usersById);
})

// /api/users/:userId/dates grabs all the dates a single user has (array)
router.get('/:userId/dates', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const dates = await getDateAsObj(user)

    if (!dates) {
      return res.status(404).json({ message: "User's dates not found" })
    }
    // console.log(dates)
    res.status(200).json(dates)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// /api/users/:userId/friends grabs all the dates a single user has (array)

router.get('/:userId/dateRequests', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const dates = user.dateRequests
    if (!dates) {
      return res.status(404).json({ message: "User's dates not found" })
    }

    res.status(200).json(dates)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:userId/friendsRequests', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const dates = user.friendRequests

    if (!dates) {
      return res.status(404).json({ message: "User's dates not found" })
    }

    res.status(200).json(dates)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:userId/friends', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const friends = await getFriendAsObj(user)

    if (!friends) {
      return res.status(404).json({ message: "User's friends not found" })
    }

    res.status(200).json(friends)
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err.message}`)
  }
})
// /api/users/:userId grabs 1 user specified by the userId in the params
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-hashedPassword');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// /api/users/:userId updates the user image
router.patch('/:userId/image', singleMulterUpload("image"), async (req, res, next) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  try {
    const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true })
      :
      DEFAULT_PROFILE_IMAGE_URL;
    updatedUserData.profileImageUrl = profileImageUrl

    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }


    if (user.password) user.password = null;

    if (req.body.password) {

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hashedPasswor) => {
          if (err) throw err;
          try {
            user.hashedPassword = hashedPasswor;
            const userUpdated = await user.save();
            const { hashedPassword, ...rest } = userUpdated.toObject();
            return res.status(200).json(rest);
          }
          catch (err) {
            next(err);
          }
        })
      });
    } else {
      res.status(200).json(user)
    }

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:userId', singleMulterUpload("image"), async (req, res, next) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  // console.log(userId)
  // console.log("backend")
  // console.log(updatedUserData)
  try {
    // 
    // console.log(req.file)
    // const profileImageUrl = req.file ?
    //   await singleFileUpload({ file: req.file, public: true }) 
    //   :
    //   DEFAULT_PROFILE_IMAGE_URL;

    // console.log(profileImageUrl)
    // updatedUserData.profileImageUrl = profileImageUrl

    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }


    if (user.password) user.password = null;

    if (req.body.password) {

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hashedPasswor) => {
          if (err) throw err;
          try {
            user.hashedPassword = hashedPasswor;
            const userUpdated = await user.save();
            const { hashedPassword, ...rest } = userUpdated.toObject();
            return res.status(200).json(rest);
          }
          catch (err) {
            next(err);
          }
        })
      });
    } else {
      res.status(200).json(user)
    }

  } catch (err) {
    res.status(500).json({ message: err.message })
  }

})
// /api/users/:userId deletes the user
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
      return res.status(404).json({ message: 'Could not delete user.' })
    }
    res.json({ message: "Successfully deleted the user." })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getFriendAsObj(user) {
  // console.log(user)
  const object = {}
  for (let i = 0; i < user.friends.length; i++) {
    const request = user.friends[i];
    // console.log(request)
    const friend = await Friend.findById(request)
    // console.log(friend)
    object[friend._id] = friend;
  }
  return object;
}

async function getDateAsObj(user) {
  // console.log(user)
  const object = {}
  for (let i = 0; i < user.dates.length; i++) {
    const request = user.dates[i];
    // console.log(request)
    const date = await Date.findById(request)
    // console.log(date)
    object[date._id] = date;
  }
  return object;
}


module.exports = router;