import './TestChat.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/session'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { fetchChatRoom, getChatRoom } from '../../store/chatRooms'
import { fetchFriends, getFriends } from '../../store/friends'
import { fetchUser, getUser } from '../../store/users'
import ChatBox from './ChatBox'
import { fetchChatMessages, getChatMessages } from '../../store/chatMessages'

const socket = io.connect("http://localhost:5001")

const TestChat = () => {

    // this should work (when completed) when redirected from clicking a specific user
    // the point is to add the other user to the history state so that the current user has access to the other user's `_id`
    // this `_id` is used to fectch the rooms that both users have

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const history = useHistory(); // use this to grab 2nd user
    const user2 = history?.location.state?.user2
    const realUser2 = useSelector(getUser(user2))

    const [updatedUser2, setUpdatedUser2] = useState(false)
    const [updatedChatRoom, setUpdatedChatRoom] = useState(false)
    const chatRoom = useSelector(getChatRoom)
    const messages = useSelector(getChatMessages)
    const [loadedMessages, setLoadedMessages] = useState(false)


    //for testing purposes, selecting all friends

    const friends = useSelector(getFriends)

    useEffect(() => {
        //fetch room passing in 2 users
        if (user2) {
            dispatch(fetchUser(user2))
                .then(() => {
                    setUpdatedUser2(true)
                })
        }
        // if (currentUser?._id && realUser2?._id) {
        //     dispatch(fetchChatRoom(currentUser._id, realUser2._id))
        //         .then(() => {
        //             setUpdatedChatRoom(true)
        //         })
        // }

        if (chatRoom) {
            dispatch(fetchChatMessages(chatRoom._id))
                .then(() => {
                    setLoadedMessages(true)
                })
        }
        // for testing purposes, fetching all friends

        dispatch(fetchFriends(currentUser?._id));

    }, [dispatch, user2, updatedUser2, updatedChatRoom])

    const joinRoom = async () => {

        await dispatch(fetchChatRoom(currentUser._id, realUser2._id))
            .then(() => {
                setUpdatedChatRoom(true)
            })
        // do logic here to auto-join room when both users (friend and current logged in user) are found
        // this is to join socket room
        if (chatRoom) {
            socket.emit("join_room", chatRoom?._id)
        }

    }

    if (friends.length === 0) return null;
    if (!messages) return null;
    return (
        <>
            {/* for testing purposes, displaying all users as a link to chat with them */}

            <div>
                <div>friends: </div>
                {friends.map(friend => {
                    return (
                        <button key={friend._id} onClick={(e) => {
                            joinRoom();
                            history.push('/test', { user1: currentUser, user2: friend.friend})
                        }}>{friend.friend}</button>
                    )
                })}
                
            </div>
            {loadedMessages ? <ChatBox messages={messages} socket={socket} user={currentUser} room={chatRoom}/> : <></>}
        </>
    )

}

export default TestChat;