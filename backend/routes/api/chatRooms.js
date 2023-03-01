const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const ChatRoom = require('../../models/ChatRoom');
// const DateRequest = mongoose.model('DateRequest');
// const User = mongoose.model("User");

router.get('/:user1Id/:user2Id', async (req, res) => {
    const user1Id = req.params.user1Id
    const user2Id = req.params.user2Id

    try {
        const chatRoom = await ChatRoom.findOne({$or:
        [{receiver: user1Id, sender: user2Id}, {receiver: user2Id, sender: user1Id}]})

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