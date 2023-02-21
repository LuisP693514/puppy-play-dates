const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FriendRequest = require('../../models/Friend-Request');
const User = require('../../models/User');
const Friend = mongoose.model('Friend');

router.post('/create', async (req, res, next) => {
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

router.patch('/:reqId', async (req, res) => {
    const requestId = req.params.reqId;
    const { status } = req.body;
    try {
        const request = await FriendRequest.findById(requestId)
        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' })
        }

        //work here
    } catch (err) {
        res.status(500).json({ message: err.messsage })
    }
})

