import jwtFetch from "./jwt";
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const REMOVE_USER = 'REMOVE_USER';

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

const removeUser = userId => ({
    type: REMOVE_USER,
    userId
});

export const getUser = userId => state => {
    return state?.users ? state?.users[userId] : null;
};

export const getUsers = state => {
    return state?.users ? Object.values(state.users) : [];
};

export const fetchUser = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}`);

    if (response.ok) {
        const user = await response.json();
        dispatch(receiveUser(user));
    }
};

export const fetchUsers = () => async (dispatch) => {
    const response = await jwtFetch(`/api/users/all`);

    if (response.ok) {
        const users = await response.json();
        dispatch(receiveUsers(users));
    }
};


export const updateUser = user => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${user.id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(receiveUser(user))
    }
};

export const deleteUser = userId => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeUser(userId))
    }
} 

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {...action.users};
        case RECEIVE_USER:
            return {...state, [action.user.id]: action.user};
        case REMOVE_USER:
            const newState = {...state};
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
};

export default usersReducer;