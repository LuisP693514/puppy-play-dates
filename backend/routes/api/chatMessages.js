const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../../models/ChatMessage');
const validateMessage = require('../../validations/messageValidation');
// const DateRequest = mongoose.model('DateRequest');
const User = mongoose.model("User");

router.post('/create', validateMessage, async (req, res, next) => {
    const {authorId, body} = req.body
    try {
        
        const author = await User.findById(authorId)

        if (!author) {
            console.log(author)
            return res.status(404).json({message: "User not found"})
        }

        // edit
        const newChatMessage = new ChatMessage({author, body})
        await newChatMessage.save();

        res.status(200).json(newChatMessage)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
});

router.get('/:chatMessageId', async (req, res) => {
    const chatMessageId = req.params.chatMessageId

    try {
        const chatMessage = await ChatMessage.findById(chatMessageId)

        if (!chatMessage){
            return res.status(404).json({message: "Chat Message not found"})
        }

        res.status(200).json(chatMessage)
        
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

module.exports = router;