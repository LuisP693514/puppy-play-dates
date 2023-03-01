import jwtFetch from "./jwt";

// Constants
const RECEIVE_CHAT_MESSAGES = "RECEIVE_CHAT_MESSAGES"

// Action creators

const receiveChatMessages = chatMessages => ({
    type: RECEIVE_CHAT_MESSAGES,
    chatMessages
})

// Selectors
export const getChatMessages = state => {
    return state?.chatMessages ? Object.values(state.chatMessages) : [];
}

// Fetch methods
/* 
    fetchChatMessages(chatRoomId) -- Fetch all the messages in a single chat room. 
                                     Chat room has max 100 messages
    createChatMessage(message) -- Creates a message 
*/

export const fetchChatMessages = (chatRoomId) => async dispatch => {
    // create the response object from the route: '/api/chatRooms/:chatRoomId/messages'
    const res = await jwtFetch(`/api/chatRooms/${chatRoomId}/messages`)

    // Check to see if response is ok before parsing
    if (res.ok) {
        const chatMessages = await res.json();
        dispatch(receiveChatMessages(chatMessages))
    } 
}

export const createChatMessage = (message) => async dispatch => {
    const res = await jwtFetch(`/api/chatMessages/create`, {
        method: 'POST',
        body: JSON.stringify(message)
    })

    if (res.ok) {
        const message = await res.json()
        
    }
}

// chatMessages reducer

const chatMessagesReducer = (state = {}, action) => {
    // Do not mutate state
    Object.freeze(state);

    // add the action to the state:

    switch (action.type) {
        // Add all the messages to the state
        case RECEIVE_CHAT_MESSAGES:
            return { ...action.chatMessages };
        default:
            return state;
    }
}

export default chatMessagesReducer;