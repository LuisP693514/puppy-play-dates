import './TestChat.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, selectCurrentUser } from '../../store/session'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { fetchChatRoom } from '../../store/chatRooms'

const socket = io.connect("http://localhost:5001")

const TestChat = () => {

    // this should work (when completed) when redirected from clicking a specific user
    // the point is to add the other user to the history state so that the current user has access to the other user's `_id`
    // this `_id` is used to fectch the rooms that both users have

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const history = useHistory(); // use this to grab 2nd user
    const user2 = history?.state?.user2


    useEffect(() => {
        //fetch room passing in 2 users
        if (currentUser?._id && user2?._id ) {
            dispatch(fetchChatRoom(currentUser._id, user2._id))
        }
    }, [dispatch])
    const joinRoom = () => {

        // do logic here to auto-join room when both users are found
    }

    const sendMessage = () => {
        // update the message state and create a new message in the backend. do not forget to add 
        // backend functionality to create a new message and store it in the user's messages array
    }   

    return (
        <div className='chatBox-wrapper'>
            <div className='chatBox-header'>
                {/* Should just be the name of the other user that the current user is talking to */}
            </div>
            <div className='chatBox-body'>
                {/* list out all the messages inside the chatroom from oldest to newest */}
            </div>
            <div className='chatBox-input'>
                <input
                    type={'text'}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    // Comment this in when the sendMessage function is functional
                    // onKeyDown={(e) => {
                    //     e.preventDefault();
                    //     if (e.key === 'Enter') {
                    //         sendMessage();
                    //     }
                    // }}
                    placeholder={"Aa"}
                />
                {/* button that sends the message just in case the user wants to click a box instead of pressing enter */}
                <button></button>
            </div>
        </div>
    )

}

export default TestChat;