const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const ChatRoom = require('../../models/ChatRoom');
const ChatMessage = require('../../models/ChatMessage')
// const DateRequest = mongoose.model('DateRequest');
// const User = mongoose.model("User");

router.get('/:chatRoomId/messages', async (req, res) => {
    const chatRoomId = req.params.chatRoomId;
    try {
        const chatRoom = await ChatRoom.findById(chatRoomId)
        if (!chatRoom) {
            return res.status(404).json({ message: "ChatRoom not found" })
        }

        const messages = await getChatMessagesAsObj(chatRoom)

        if (!messages) {
            return res.status(404).json({ message: "ChatRoom messages not found" })
        }

        res.status(200).json(messages)
    } catch (err) {
        console.log(err)
        res.status(500).send(`${err.message}`)
    }
})

router.get('/:user1Id/:user2Id', async (req, res) => {
    const user1Id = req.params.user1Id
    const user2Id = req.params.user2Id

    try {
        const chatRoom = await ChatRoom.findOne({
            $or:
                [{ receiver: user1Id, sender: user2Id }, { receiver: user2Id, sender: user1Id }]
        })

        if (!chatRoom) {
            return res.status(404).json({ message: "Chat room not found" })
        }

        res.status(200).json(chatRoom)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

async function getChatMessagesAsObj(chatRoom) {
    // console.log(chatRoom)
    const object = {}
    for (let i = 0; i < chatRoom.messages.length; i++) {
        const request = chatRoom.messages[i];
        // console.log(request)
        const chatMessage = await ChatMessage.findById(request)
        // console.log(chatMessage)
        object[chatMessage._id] = chatMessage;
    }
    return object;
}


module.exports = router;