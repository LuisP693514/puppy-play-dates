import jwtFetch from "./jwt";

export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
export const RECEIVE_FRIEND_REQUESTS = 'RECEIVE_FRIEND_REQUESTS';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';

const receiveFriendRequest = friendRequest => ({
    type: RECEIVE_FRIEND_REQUEST,
    friendRequest
});

const receiveFriendRequests = friendRequests => ({
    type: RECEIVE_FRIEND_REQUESTS,
    friendRequests
});

const removeFriendRequest = friendRequestId => ({
    type: REMOVE_FRIEND_REQUEST,
    friendRequestId
});

export const getFriendRequest = friendRequestId => state => {
    return state?.friendRequests ? state.friendRequests[friendRequestId] : null;
};

export const getFriendRequests = state => {
    return state?.friendRequests ? Object.values(state.friendRequests) : [];
};

export const fetchFriendRequest = (friendRequestId) => async (dispatch) => {
    const response = await jwtFetch(`/api/friendRequests/${friendRequestId}`);

    if (response.ok) {
        const friendRequest = await response.json();
        dispatch(receiveFriendRequest(friendRequest));
    }
};

export const fetchFriendRequests = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/friendRequests/${userId}`);

    if (response.ok) {
        const friendRequests = await response.json();
        dispatch(receiveFriendRequests(friendRequests));
    }
};

// export const fetchFriendRequestsPendingCreator = userId => async (dispatch) => {
//     const response = await jwtFetch(`/api/friendRequests/${userId}/pending/creator`);

//     if (response.ok) {
//         const friendRequests = await response.json();
//         dispatch(receiveFriendRequests(friendRequests));
//     }
// };


// export const fetchFriendRequestsPendingInvitee = userId => async (dispatch) => {
//     const response = await jwtFetch(`/api/friendRequests/${userId}/pending/invitee`);

//     if (response.ok) {
//         const friendRequests = await response.json();
//         dispatch(receiveFriendRequests(friendRequests));
//     }
// };

// export const fetchFriendRequestsRejected = userId => async (dispatch) => {
//     const response = await jwtFetch(`/api/friendRequests/${userId}/rejected/creator`);

//     if (response.ok) {
//         const friendRequests = await response.json();
//         dispatch(receiveFriendRequests(friendRequests));
//     }
// };


export const updateFriendRequest = friendRequest => async (dispatch) => {
    const response = await jwtFetch(`/api/friendRequests/${friendRequest._id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(friendRequest)
    });

    if (response.ok) {
        const friendRequest = await response.json();
        dispatch(receiveFriendRequest(friendRequest))
    }
};

export const createFriendRequest = friendRequest => async (dispatch) => {
    const response = await jwtFetch(`/api/friendRequests/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(friendRequest)
    });

    if (response.ok) {
        const friendRequest = await response.json();
        dispatch(receiveFriendRequest(friendRequest))
    }
};

export const deleteFriendRequest = friendRequestId => async (dispatch) => {
    const response = await jwtFetch(`/api/friendRequests/${friendRequestId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeFriendRequest(friendRequestId))
    }
};

const friendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FRIEND_REQUESTS:
        return {...action.friendRequests};
    case RECEIVE_FRIEND_REQUEST:
        return {...state, [action.friendRequest._id]: action.friendRequest};
    case REMOVE_FRIEND_REQUEST:
        const { [action.friendRequestId]: deletedFriendRequest, ...newState } = state;
        return newState;
    default:
      return state;
  }
};

export default friendRequestReducer;