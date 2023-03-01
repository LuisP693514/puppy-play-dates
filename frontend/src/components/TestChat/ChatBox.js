import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatMessages, getChatMessages } from '../../store/chatMessages';
import './TestChat.css'

const ChatBox = ({ room, user, socket }) => {

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const messages = useSelector(getChatMessages)

    useEffect(() => {
        if (room){

            dispatch(fetchChatMessages(room?._id));
        }
        socket.on('receive_message', (data) => {

        })
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
            await socket.emit('send_message', messageData)
            
            setMessage('')
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
                {messages.map(message => {
                    return (
                        <p className='messageBox' key={message?._id}></p>
                    )
                })}
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
                }}></button>
            </div>
        </div>
    )

}

export default ChatBox;