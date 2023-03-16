// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createChatMessage, fetchChatMessages } from '../../store/chatMessages';
// import ScrollToBottom from 'react-scroll-to-bottom';
// import './TestChat.css';

// const ChatBox = ({ room, user, socket, messages }) => {

//     const dispatch = useDispatch();
//     const [message, setMessage] = useState({author: user._id, body: '', room: room?._id});
//     const [messageList, setMessageList] = useState(messages)

//     useEffect(() => {
//         socket.on("receive_message", (data) => {
//             setMessageList((list) => [...list, data])
//         })
//         // if (room?._id) {
//         //     dispatch(fetchChatMessages(room._id));
//         // }
//     }, [dispatch])
//     const sendMessage = async () => {
//         // update the message state and create a new message in the backend. do not forget to add 
//         // backend functionality to create a new message and store it in the user's messages array
//         if (message) {
//             const messageData = {
//                 author: user._id,
//                 body: message.body,
//                 room: room?._id,
//                 createdAt: new Date(Date.now())
//             }
//             await socket.emit("send_message", messageData)
//             setMessage({author: user._id, body: '', room: room?._id})
//             setMessageList((list) => [...list, messageData])
//             dispatch(createChatMessage(messageData))
//         }

//     }

//     return (
//         <div className='chatBox-wrapper'>
//             <div className='chatBox-header'>
//                 {/* Should just be the name of the other user that the current user is talking to */}
//                 <p>Live Chat</p>
//             </div>

//             <div className='chat-body'>
//                 <ScrollToBottom className='message-container'>
//                     {/* list out all the messages inside the chatroom from oldest to newest */}
//                     {messageList.map(message => (<div className='messageBox' key={message._id}
//                         id={message.author === user._id ? "currentUser" : "otherUser"}>
//                         <p className='message-content'>{message.body}</p>
//                         <div className={'message-time'}>
//                             <p id='date-time-p-tag'>{parseDateTime(message.createdAt)}</p>
//                         </div>
//                     </div>))}
//                 </ScrollToBottom>
//             </div>
//             <div className='chatBox-input'>
//                 <input
//                     type={'text'}
//                     value={message.body}
//                     onChange={(e) => {
//                         setMessage({
//                             author: user._id,
//                             body: e.target.value,
//                             room: room?._id
//                         })
//                     }}
//                     // Comment this in when the sendMessage function is functional
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             sendMessage();
//                         }
//                     }}
//                     placeholder={"Aa"}
//                 />
//                 {/* button that sends the message just in case the user wants to click a box instead of pressing enter */}
//                 <button onClick={(e) => {
//                     e.preventDefault();
//                     sendMessage();
//                 }}>send</button>
//             </div>
//         </div>
//     )

// }

// const parseDateTime = (dateString) => {
//     const date = new Date(dateString);

//     let hours = date.getUTCHours();
//     const minutes = ("0" + date.getUTCMinutes()).slice(-2);

//     const amPM = hours >= 12 ? "PM" : "AM";
//     hours %= 12;
//     hours = hours || 12;

//     return (hours + ":" + minutes + " " + amPM + " UTC");
// }

// export default ChatBox;