import jwtFetch from "./jwt";

export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const REMOVE_FRIEND = 'REMOVE_FRIEND'


const receiveFriend = friend => ({
    type: RECEIVE_FRIEND,
    friend
});

const receiveFriends = friends => ({
    type: RECEIVE_FRIENDS,
    friends
});

const removeFriend = friendId => ({
    type: REMOVE_FRIEND,
    friendId
});

export const getFriend = friendId => state => {
    return state?.friends ? state.friends[friendId] : null;
};

export const getFriends = state => {
    return state?.friends ? Object.values(state.friends) : [];
};


export const fetchFriend = (friendId) => async (dispatch) => {
    const response = await jwtFetch(`/api/friends/${friendId}`);

    if (response.ok) {
        const friend = await response.json();
        dispatch(receiveFriend(friend));
    }
};

export const fetchFriends = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/${userId}/friends`);

    if (response.ok) {
        const friends = await response.json();
        dispatch(receiveFriends(friends));
    }
};

export const updateFriend = friend => async (dispatch) => {
    const response = await jwtFetch(`/api/friends/${friend._id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(friend)
    });

    if (response.ok) {
        const friend = await response.json();
        dispatch(receiveFriend(friend))
    }
};

export const createFriend = friend => async (dispatch) => {
    const response = await jwtFetch(`/api/friends/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(friend)
    });

    if (response.ok) {
        const friend = await response.json();
        dispatch(receiveFriend(friend))
    }
};

export const deleteFriend = friendId => async (dispatch) => {
    const response = await jwtFetch(`/api/friends/${friendId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeFriend(friendId))
    }
}

const friendsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FRIENDS:
        return {...action.friends};
    case RECEIVE_FRIEND:
        return {...state, [action.friend._id]: action.friend};
    case REMOVE_FRIEND:
        const newState = {...state};
        delete newState[action.friendId];
        return newState;
    default:
      return state;
  }
};

export default friendsReducer;

