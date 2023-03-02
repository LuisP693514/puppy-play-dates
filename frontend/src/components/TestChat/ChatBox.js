import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { createChatMessage, fetchChatMessages } from '../../store/chatMessages';
import './TestChat.css'

const ChatBox = ({ room, user, socket, messages }) => {

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState(messages)

    useEffect(() => {
        socket.on("receive_message", (data) => {
            dispatch(createChatMessage(data))
            setMessageList((list) => [...list, data])
        })
        if (room) {
            dispatch(fetchChatMessages(room?._id));
        }
    }, [dispatch, socket])


    const sendMessage = async () => {
        // update the message state and create a new message in the backend. do not forget to add 
        // backend functionality to create a new message and store it in the user's messages array
        if (message) {
            const messageData = {
                author: user,
                body: message,
                room: room?._id
            }
            await socket.emit("send_message", messageData)
            setMessage('')
            setMessageList((list) => [...list, messageData])
        }

    }

    return (
        <div className='chatBox-wrapper'>
            <div className='chatBox-header'>
                {/* Should just be the name of the other user that the current user is talking to */}
                {`LiveChat`}
            </div>
            <div className='chatBox-body'>
                {/* list out all the messages inside the chatroom from oldest to newest */}
                {messageList.map(message => <p className='messageBox' key={message._id}>{message.body}</p>)}
            </div>
            <div className='chatBox-input'>
                <input
                    type={'text'}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    // Comment this in when the sendMessage function is functional
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    placeholder={"Aa"}
                />
                {/* button that sends the message just in case the user wants to click a box instead of pressing enter */}
                <button onClick={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}>send</button>
            </div>
        </div>
    )

}

export default ChatBox;