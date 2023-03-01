import jwtFetch from "./jwt";

// Constants
const RECEIVE_CHAT_ROOM = "RECEIVE_CHAT_ROOM"

// Action creators

const receiveChatRoom = chatRoom => ({
    type: RECEIVE_CHAT_ROOM,
    chatRoom
})

// Selectors
export const getChatRoom = chatRoomId => state => {
    return state?.chatRooms ? state.chatRooms[chatRoomId] : null;
}

// Fetch methods
/* 
    fetchChatRoom(user1Id, user2Id) -- need 2 users to fetch their corresponding room
*/

export const fetchChatRoom = (user1Id, user2Id) => async dispatch => {
    // create the response object from the route: '/api/chatRooms/:user1Id/:user2Id'
    const res = await jwtFetch(`/api/chatRooms/${user1Id}/${user2Id}`)

    // Check to see if response is ok before parsing
    if (res.ok) {
        const chatRoom = await res.json();
        dispatch(receiveChatRoom(chatRoom))
    }
}

// chatRooms reducer

const chatRoomsReducer = (state = {}, action) => {
    // Do not mutate state
    Object.freeze(state)

    // Create a shallow dupe of the state
    const newState = {...state}

    // add the action to the state:

    switch (action.type) {
        // Add a single chatroom to the state
        case RECEIVE_CHAT_ROOM:
            return newState.chatRooms[action.chatRoom._id] = action.chatRoom;
    
        default:
            return state;
    }
}

export default chatRoomsReducer;