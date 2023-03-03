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
    const user2 = history?.location?.state?.user2
    const oldRoom = history?.location?.state?.oldRoom
    const realUser2 = useSelector(getUser(user2))
    const [updatedUser2, setUpdatedUser2] = useState(false)
    const [updatedChatRoom, setUpdatedChatRoom] = useState(false)
    const chatRoom = useSelector(getChatRoom)
    const messages = useSelector(getChatMessages)
    const [loadedMessages, setLoadedMessages] = useState(false)
    const [joinedRoom, setJoinedRoom] = useState(false)


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

        if (realUser2) {
            grabChatRoom()
        }

        if (chatRoom?._id) {
            dispatch(fetchChatMessages(chatRoom._id))
                .then(() => {
                    setLoadedMessages(true);
                })
            joinRoom();
        }
        // for testing purposes, fetching all friends

        dispatch(fetchFriends(currentUser?._id));
 
    }, [dispatch, user2, updatedUser2, updatedChatRoom, joinedRoom])

    const grabChatRoom = async () => {

        await dispatch(fetchChatRoom(currentUser._id, realUser2._id))
            .then(() => {
                setUpdatedChatRoom(true)
            })

    }
    const joinRoom = () => {
        socket.emit("join_room", { room: chatRoom._id, oldRoom: oldRoom })
    }

    if (friends.length === 0) return null;
    return (
        <>
            {/* for testing purposes, displaying all users as a link to chat with them */}

            <div>
                <div>friends: </div>
                {friends.map(friend => {
                    return (
                        <>
                            <button
                                disabled={user2 === friend.friend}
                                key={friend._id}
                                onClick={(e) => {
                                    setJoinedRoom(false)
                                    history.push('/test', { user1: currentUser, user2: friend.friend, oldRoom: chatRoom?._id })
                                }}>{friend.friend}</button>
                            {(!joinedRoom) && <button
                                id={"button-to-start-chatting"}
                                disabled={user2 !== friend.friend}
                                onClick={(e) => {
                                    history.push('/test', { user1: currentUser, user2: friend.friend, oldRoom: oldRoom })
                                    setJoinedRoom(true)
                                }}>Open Chat</button>}
                        </>
                    )
                })}
            </div>

            {loadedMessages && joinedRoom ? <ChatBox messages={messages} socket={socket} user={currentUser} room={chatRoom} /> : <></>}
        </>
    )

}

export default TestChat;