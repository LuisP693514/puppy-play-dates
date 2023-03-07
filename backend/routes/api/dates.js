const express = require('express');
const mongoose = require('mongoose');
const Date = require('../../models/Date');
const router = express.Router();
const User = mongoose.model("User");


router.get('/:dateId', async (req, res) => {
    const dateId = req.params.dateId
    try {
        const date = await Date.findById(dateId)
        if (!date) {
            return res.status(404).json({ message: "Date not found" })
        }

        res.status(200).json(date)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

router.post('/create', async (req, res) => {
    const { creator, invitee, date } = req.body;
    try {
        // check to see if creator exists
        const creatorR = await User.findById(creator)
        if (!creatorR) {
            return res.status(404).json({ message: "Creator not found" })
        }

        // check to see if the invitee exists
        const inviteeR = await User.findById(invitee)
        if (!inviteeR) {
            return res.status(404).json({ message: "Invitee not found" })
        }

        // check to see if both users have a date with conflicting times
        const existingDate = await Date.findOne({
            $or: [
                { creator: creator, invitee: invitee, date: date },
                { creator: invitee, invitee: creator, date: date }
            ]
        })

        if (existingDate) {
            return res.status(400).json({ message: "Conflicting dates" })
        }

        //create new friend now that all validations pass
        const newDate = new Date(req.body)
        await newDate.save();

        creatorR.dates.push(newDate._id);
        inviteeR.dates.push(newDate._id);

        await creatorR.save();
        await inviteeR.save();

        res.status(201).json(newDate);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:dateId', async (req, res) => {
    const dateId = req.params.dateId
    try {
        const date = await Date.findById(dateId)
        console.log(date)
        if (!date) {
            return res.status(404).json({ message: "Date not found" })
        }

        const user1 = await User.findById(date.creator);
        const user2 = await User.findById(date.invitee);
        if (!user1 || !user2) {
            return res.status(404).json({message: "Users not found"})
        }

        const index1 = user1.dates.indexOf(dateId);
        const index2 = user2.dates.indexOf(dateId);

        if (index1 > -1 ) user1.dates.splice(index1, 1);
        if (index2 > -1 ) user2.dates.splice(index2, 1);

        await user1.save();
        await user2.save();

        await date.remove();

        res.status(200).json({ message: "Date deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:dateId', async (req, res) => {
    const dateId = req.params.dateId
    const updateData = req.body
    try {
        const date = await Date.findByIdAndUpdate(dateId, updateData, { new: true })
        if (!date) {
            return res.status(404).json({ message: "Date not found" })
        }
        res.status(200).json(date)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;