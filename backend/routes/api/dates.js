const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Date = mongoose.model('Date');
const User = mongoose.model("User");


router.get('/:dateId', async (req, res) => {
    const dateId = req.params.dateId
    try {
        const Date = await Date.findById(dateId)
        if (!Date) {
            return res.status(404).json({ message: "Date not found" })
        }

        res.status(200).json({dateId: Date})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/create', async (req, res) => {
    const { creatorId, inviteeId, latitude, longitude, date } = req.body;
    try {
        // check to see if creator exists
        const creator = await User.findById(creatorId)
        if (!creator) {
            return res.status(404).json({ message: "Creator not found" })
        }

        // check to see if the invitee exists
        const invitee = await User.findById(inviteeId)
        if (!invitee) {
            return res.status(404).json({message: "Invitee not found"})
        }

        // check to see if both users have a date with conflicting times
        const existingDate = await Date.findOne({
            $or: [
                { creator: creatorId, invitee: inviteeId, date: date },
                { creator: inviteeId, invitee: creatorId, date: date }
            ]
        })

        if (existingDate) {
            return res.status(400).json({ message: "Conflicting dates" })
        }

        //create new friend now that all validations pass
        const newFriend = new Friend({ user: userId, friend: friendId })
        await newFriend.save();

        res.status(201).json(newFriend)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:dateId', async (req, res) => {
    const dateId = req.params.dateId
    try {
        const date = await Date.findByIdAndDelete(dateId)
        if (!date) {
            return res.status(404).json({ message: "Date not found" })
        }

        res.status(200).json({ message: "Date deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:dateId', async (req, res) => {
    const dateId = req.params.dateId
    const dateUpdate = req.body
    try {
        const date = Date.findByIdAndUpdate(dateId, dateUpdate, {new: true})
        if (!date) {
            return res.status(404).json({message: "Date not found"})
        }

        res.status(200).json({dateId: date})
    } catch (err) {
        
    }
})