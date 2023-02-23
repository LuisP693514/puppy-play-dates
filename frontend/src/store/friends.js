import jwtFetch from "./jwt";

export const CREATE_FRIEND_REQUEST = 'CREATE_FRIEND_REQUEST';
export const CREATE_FRIEND_SUCCESS = 'CREATE_FRIEND_SUCCESS';
export const CREATE_FRIEND_FAILURE = 'CREATE_FRIEND_FAILURE';
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const REMOVE_FRIEND = 'REMOVE_FRIEND'


const createFriendRequest = () => ({
  type: CREATE_FRIEND_REQUEST,
});

const createFriendSuccess = (friend) => ({
  type: CREATE_FRIEND_SUCCESS,
  payload: friend,
});

const createFriendFailure = (error) => ({
  type: CREATE_FRIEND_FAILURE,
  payload: error,
});

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
})


export const getCreatedFriend = (state) => state.createFriend.friend;
export const isCreatingFriend = (state) => state.createFriend.isLoading;
export const getCreateFriendError = (state) => state.createFriend.error;

export const getFriend = friendId => state => {
    return state?.friends ? state.friends[friendId] : null;
};

export const getFriends = state => {
    return state?.friends ? Object.values(state.friends) : [];
};

export const createNewFriend = (user1Id, user2Id, friendInfo) => async (dispatch) => {
  dispatch(createFriendRequest());

  try {
    const response = await jwtFetch(`/api/friends`, {
      method: 'POST',
      body: JSON.stringify({ user1Id, user2Id, ...friendInfo }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const friend = await response.json();
      dispatch(createFriendSuccess(friend));
    } else {
      const { error } = await response.json();
      dispatch(createFriendFailure(error));
    }

  } catch (error) {
    dispatch(createFriendFailure(error.message));
  }
};

export const fetchFriend = (friendId) => async (dispatch) => {
    const response = await jwtFetch(`/api/friends/${friendId}`);

    if (response.ok) {
        const friend = await response.json();
        dispatch(receiveFriend(friend));
    }
};

export const fetchFriends = () => async (dispatch) => {
    const response = await jwtFetch(`/api/friends`);

    if (response.ok) {
        const friends = await response.json();
        dispatch(receiveFriends(friends));
    }
};

export const upFriend = friend => async (dispatch) => {
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

export const deleteFriend = friendId => async (dispatch) => {
    const response = await jwtFetch(`/api/friend/${friendId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeFriend(friendId))
    }
} 

const initialState = {
  Friend: null,
  isLoading: false,
  error: null,
};

const createFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FRIEND_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_FRIEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Friend: action.payload,
      };
    case CREATE_FRIEND_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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

export default createFriendReducer;

