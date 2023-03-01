const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../../models/ChatMessage');
const ChatRoom = require('../../models/ChatRoom');
const validateMessage = require('../../validations/messageValidation');
// const DateRequest = mongoose.model('DateRequest');
const User = mongoose.model("User");

router.post('/create', validateMessage, async (req, res, next) => {
    const {author, body, room} = req.body
    try {

        const chatRoom = await ChatRoom.findById(room)
        const authorReal = await User.findById(author._id)

        if (!chatRoom || !authorReal) {
            return res.status(404).json({message: "Chat room or User not found"})
        }

        // edit
        const newChatMessage = new ChatMessage({authorReal, body})
        await newChatMessage.save();

        if (chatRoom.messages.length < 100) {
            chatRoom.messages.push(newChatMessage._id)
        } else {
            chatRoom.messages.shift();
            chatRoom.messages.push(newChatMessage._id)
        }

        await authorReal.save();
        await chatRoom.save();

        res.status(200).json(newChatMessage)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
});

module.exports = router;