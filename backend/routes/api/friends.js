const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Friend = mongoose.model('Friend');
const User = mongoose.model("User");


router.get('/:friendId', async (req, res) => {
    const friendId = req.params.friendId
    try {
        const friend = await Friend.findById(friendId)
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" })
        }

        res.status(200).json(friend)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/create', async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        // check to see if user exists
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // check to see if friend exists
        const friend = await User.findById(friendId)
        if (!friend) {
            return res.status(404).json({ message: "Potential friend not found" })
        }

        // check to see if both users are friends
        const existingFriend = await Friend.findOne({
            $or: [
                { user: userId, friend: friendId },
                { user: friendId, friend: userId }
            ]
        })

        if (existingFriend) {
            return res.status(400).json({ message: "Friend already exists" })
        }

        //create new friend now that all validations pass
        const newFriend = new Friend({ user: userId, friend: friendId })
        await newFriend.save();

        res.status(201).json(newFriend)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:friendId', async (req, res) => {
    const friendId = req.params.friendId
    try {
        const friend = await Friend.findByIdAndDelete(friendId)
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" })
        }

        res.status(200).json({ message: "Friend deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})