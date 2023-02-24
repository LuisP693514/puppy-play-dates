const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
            name: req.body.name,
            description: req.body.description
        })

        const savedRequest = await newRequest.save();

        sender.dateRequests.push(savedRequest._id);
        receiver.dateRequests.push(savedRequest._id);

        await sender.save();
        await receiver.save();

        res.status(201).json(savedRequest);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const dRById = await getDateRequestsPending(user)
        res.status(200).json(dRById)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// router.get('/:userId', async (req, res) => {
//     console.log("hello")
//     const userId = req.params.userId;
//     try {
//         const user = await User.findById(userId)
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' })
//         }

//         const requests = await FriendRequest.find({ $or: [{ sender: userId }, { receiver: userId }] })
//             .populate('sender', '_id username')
//             .populate('receiver', '_id username');

//         res.status(200).json(requests)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

router.patch('/:reqId', async (req, res) => {
    const requestId = req.params.reqId;
    const updateData = req.body;
    try {
        const request = await DateRequest.findByIdAndUpdate(requestId, updateData, {new: true})
        if (!request) {
            return res.status(404).json({ message: 'Date request not found' })
        }

        //work here
        res.status(200).json(request)

    } catch (err) {
        res.status(500).json({ message: err.messsage })
    }
})

router.delete('/reqId', async (req, res) => {
    const requestId = req.params.reqId
    try {
        const request = await DateRequest.findByIdAndDelete(requestId)

        if (!request) {
            return res.status(404).json({message: "Failed to delete date request"})
        }

        res.status(200).json({message: "Deleted date request successfully."})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getDateRequestsPending(user) {
    const object = {}
    for (let i = 0; i < user.dateRequests.length; i++) {
        const request = user.dateRequests[i];
        const date = await DateRequest.findById(request)
        object[user.dateRequests[i]] = date;
    }
    return object;
}

module.exports = router;
