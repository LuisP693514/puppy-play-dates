import jwtFetch from "./jwt";

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const getUser = userId => state => {
    return state?.users ? state.user[userId] : null;
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
    const response = await jwtFetch(`/api/users`);

    if (response.ok) {
        const users = await response.json();
        dispatch(receiveUsers(users));
    }
};

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {...action.users};
        case RECEIVE_USER:
            return {...state, [action.user.id]: action.user};
        default:
            return state;
    }
};

export default usersReducer;