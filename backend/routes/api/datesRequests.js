const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DateRequest = mongoose.model('DateRequest');
const User = mongoose.model("User")

router.post('/create', async (req, res, next) => {
    const { senderId, receiverId, date } = req.body;
    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Sender or receiver not found!" })
        }

        const existingRequest = await DateRequest.findOne({

            $or: [{ sender: senderId, receiver: receiverId, date: date },
            { sender: receiverId, receiver: senderId, date: date }]
        })

        if (existingRequest) {
            return res.status(400).json({ message: "Date request already exists" });
        }

        const newRequest = new DateRequest({
            sender: senderId,
            receiver: receiverId,
            date: date,
            creator: senderId,
            invitee: receiverId,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name
        })

        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/:requestId', async (req, res) => {
    const requestId = req.params.requestId;
    try {
        const request = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const requests = await FriendRequest.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .populate('sender', '_id username')
            .populate('receiver', '_id username');

        res.status(200).json(requests)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:reqId', async (req, res) => {
    const requestId = req.params.reqId;
    const { status } = req.body;
    try {
        const request = await FriendRequest.findById(requestId)
        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' })
        }

        //work here
        request.status = status;
        const savedRequest = await request.save();
        res.status(200).json(savedRequest)

    } catch (err) {
        res.status(500).json({ message: err.messsage })
    }
})

module.exports = router;
