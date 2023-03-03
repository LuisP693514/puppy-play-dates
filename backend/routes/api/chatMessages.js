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
        const authorReal = await User.findById(author)

        if (!chatRoom || !authorReal) {
            return res.status(404).json({message: "Chat room or User not found"})
        }

        // create a new chat message
        const newChatMessage = new ChatMessage({author: authorReal, body})

        // fetch the latest version of the chat room document
        const latestChatRoom = await ChatRoom.findById(room)
        let msgId;
        if (latestChatRoom.messages.length < 50) {
            latestChatRoom.messages.push(newChatMessage._id)
        } else {
            msgId = latestChatRoom.messages.shift();
            
            latestChatRoom.messages.push(newChatMessage._id)
        }

        await latestChatRoom.save();
        // await authorReal.save();
        await newChatMessage.save();
        if (msgId){
            const msg = await ChatMessage.findById(msgId)
            await msg.remove();
        }
        res.status(200).json(newChatMessage)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
});

module.exports = router;