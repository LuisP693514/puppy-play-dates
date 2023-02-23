const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DateRequest = require('../../models/DateRequest');
const DateRequest = require('../../models/DateRequest');
// const DateRequest = mongoose.model('DateRequest');
const User = mongoose.model("User");

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

router.get('/:userId/filter', async (req, res) => {
    const userId = req.params.userId
    console.log("IM IN")
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // const dRById = {}
        // user.dateRequests.forEach(request => {
        //     const date = await DateRequest.findById(request._id).select("_id creator invitee")
        //     dRById[request._id] = date;
        // });

        const dRById = await getDateRequests(user)
        console.log(dRById)
        res.status(200).json(dRById)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/:userId', async (req, res) => {
    console.log("hello")
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
        request.status = status;
        const savedRequest = await request.save();
        res.status(200).json(savedRequest)

    } catch (err) {
        res.status(500).json({ message: err.messsage })
    }
})

async function getDateRequests(user) {
    const object = {}
    for (let i = 0; i < user.dateRequests.length; i++) {
        const request = user.dateRequests[i];
        const date = await DateRequest.findById(request).select("_id creator invitee status");
        object[user.dateRequests[i]] = date;
    }
    return object;
}

module.exports = router;
