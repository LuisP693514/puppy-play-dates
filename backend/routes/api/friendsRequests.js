const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FriendRequest = mongoose.model('FriendRequest');
const User = mongoose.model('User');

router.post('/create', async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Sender or receiver not found!" })
        }

        const existingRequest = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exists" });
        }

        const newRequest = new FriendRequest({ sender: senderId, receiver: receiverId })
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId)
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

router.patch('/:requestId', async (req, res) => {
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

router.delete('/:requestId', async (req, res) => {
    const requestId = req.params.requestId
    try {
        const request = await FriendRequest.findByIdAndDelete(requestId)
        if (!request) {
            return res.status(404).json({message: "Friend request not found."})
        }
        res.json({message: "Successfully deleted friend request"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;
