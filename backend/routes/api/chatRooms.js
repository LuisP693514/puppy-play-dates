const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatRoom = require('../../models/ChatRoom');
// const DateRequest = mongoose.model('DateRequest');
const User = mongoose.model("User");

router.post('/create', async (req, res, next) => {
    const {senderId, receiverId} = req.body
    try {
        
        const sender = await User.findById(senderId)
        const receiver = await User.findById(receiverId)

        if (!sender || !receiver) {
            console.log(sender)
            console.log(receiver)
            return res.status(404).json({message: "User not found"})
        }

        const chatExists = await ChatRoom.findOne({$or: [{sender: sender, receiver: receiver}, {sender: receiver, receiver: sender}]})

        if (!chatExists) {
            return res.status(400).json({message: "Chat room already exists"})
        }

        const newChatRoom = new ChatRoom({sender, receiver})
        await newChatRoom.save();

        res.status(200).json(newChatRoom)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
});

router.get('/:chatRoomId', async (req, res) => {
    const chatRoomId = req.params.chatRoomId

    try {
        const chatRoom = await ChatRoom.findById(chatRoomId)

        if (!chatRoom){
            return res.status(404).json({message: "Chat room not found"})
        }

        res.status(200).json(chatRoom)
        
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

module.exports = router;