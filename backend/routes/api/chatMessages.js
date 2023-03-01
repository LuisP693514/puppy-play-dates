const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../../models/ChatMessage');
const ChatRoom = require('../../models/ChatRoom');
const validateMessage = require('../../validations/messageValidation');
// const DateRequest = mongoose.model('DateRequest');
const User = mongoose.model("User");

router.post('/create', validateMessage, async (req, res, next) => {
    const {author, body, chatRoomId} = req.body
    try {

        const chatRoom = await ChatRoom.findById(chatRoomId)

        if (!chatRoom) {
            return res.status(404).json({message: "Chat room not found"})
        }

        // edit
        const newChatMessage = new ChatMessage({author, body})
        await newChatMessage.save();

        author.messages.unshift(newChatMessage._id)
        if (chatRoom.messages.length < 30) {
            chatRoom.messages.unshift(newChatMessage._id)
        } else {
            chatRoom.messages.pop();
            chatRoom.messages.unshift(newChatMessage._id)
        }

        await author.save();
        await chatRoom.save();

        res.status(200).json(newChatMessage)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
});

module.exports = router;