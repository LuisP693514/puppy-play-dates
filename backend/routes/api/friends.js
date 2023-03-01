const express = require('express');
const mongoose = require('mongoose');
const ChatRoom = require('../../models/ChatRoom');
const router = express.Router();
const Friend = require('../../models/Friend');
// const Friend = mongoose.model('Friend');
const User = mongoose.model("User");


router.get('/:friendId', async (req, res) => {
    const friendId = req.params.friendId
    try {
        const friend = await Friend.findById(friendId)
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" })
        }

        res.status(200).json(friend)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/create', async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        // check to see if user exists
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // check to see if friend exists
        const friend = await User.findById(friendId)
        if (!friend) {
            return res.status(404).json({ message: "Potential friend not found" })
        }

        // check to see if both users are friends
        const existingFriend = await Friend.findOne({
            $or: [
                { user: userId, friend: friendId },
                { user: friendId, friend: userId }
            ]
        })

        if (existingFriend) {
            return res.status(400).json({ message: "Friend already exists" })
        }

        const newChatRoom = new ChatRoom({sender: userId, receiver: friendId})
        await newChatRoom.save();

        //create new friend now that all validations pass
        const newFriend = new Friend({ user: userId, friend: friendId })
        const newerFriend = new Friend({ user: friendId, friend: userId })
        await newFriend.save();
        await newerFriend.save();

        user.friends.push(newFriend._id);
        friend.friends.push(newerFriend._id);

        user.chatRooms.push(newChatRoom._id)
        friend.chatRooms.push(newChatRoom._id)

        await user.save();
        await friend.save();

        res.status(201).json(newFriend)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:friendId', async (req, res) => {
    const friendId = req.params.friendId
    try {
        const friend = await Friend.findById(friendId)
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" })
        }
        const user = await User.findById(friend.user)
        const user2 = await User.findById(friend.friend)

        if (!user || !user2) {
            return res.status(404).json({message: "User not found"})
        }
        // delete the associations
        const index1 = user.friends.indexOf(friendId)

        // friend stores the friend as a separate obj
        // find that id and delete the association + the entry from database
        const friend2 = await Friend.findOne({$and: [{user: friend.friend},{ friend: friend.user}]})

        const index2 = user2.friends.indexOf(friend2._id)

        if (!friend2) {
            return res.status(400).json({message: "Friend2 not found"})
        }
        
        if (index1 > -1){
            user.friends.splice(index1, 1)
        }

        if (index2 > -1) {
            user2.friends.splice(index2, 1)
        }

        await user.save();
        await user2.save();

        await friend.remove();
        await friend2.remove();

        res.status(200).json({ message: "Friend deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;