const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FriendRequest = require('../../models/FriendRequest');
// const FriendRequest = mongoose.model('FriendRequest');
const User = mongoose.model('User');

router.post('/create', async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        const senderm = await User.findById(sender);
        const receiverm = await User.findById(receiver);
        if (!senderm || !receiverm) {
            return res.status(404).json({ message: "Sender or receiver not found!" })
        }

        const existingRequest = await FriendRequest.findOne({ sender: sender, receiver: receiver, status: 'pending' });

        if (existingRequest) {
            return res.status(400).send("Friend request already exists");
        }

        const newRequest = new FriendRequest({ sender: sender, receiver: receiver, status: 'pending' })
        const validation = await newRequest.validate();

        if (validation) {
            return res.status(402).json({ message: "Could not validate" })
        }

        const savedRequest = await newRequest.save();

        // add the savedRequest to the senderm.friendRequests array
        senderm.friendRequests.push(savedRequest._id);
        receiverm.friendRequests.push(savedRequest._id);
        // save the updated senderm document to the database
        await senderm.save();
        await receiverm.save();

        console.log(senderm.friendRequests)

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

        const requests = await getFriendRequestsPending(user)

        res.status(200).json(requests)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:requestId', async (req, res) => {
    const requestId = req.params.reqId;
    const updateData = req.body;
    try {
        const request = await FriendRequest.findByIdAndUpdate(requestId, updateData, { new: true })
        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' })
        }

        res.status(200).json(request)

    } catch (err) {
        res.status(500).json({ message: err.messsage })
    }
})

router.delete('/:requestId', async (req, res) => {
    const requestId = req.params.requestId
    try {
        const request = await FriendRequest.findByIdAndDelete(requestId)
        if (!request) {
            return res.status(404).json({ message: "Friend request not found." })
        }
        res.json({ message: "Successfully deleted friend request" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getFriendRequestsPending(user) {
    const object = {}
    for (let i = 0; i < user.friendRequests.length; i++) {
        const request = user.friendRequests[i];
        const friendRequest = await FriendRequest.findById(request)
        object[user.friendRequests[i]] = friendRequest;
    }
    return object;
}

module.exports = router;
