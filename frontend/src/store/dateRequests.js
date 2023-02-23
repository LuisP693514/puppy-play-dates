import jwtFetch from "./jwt";


export const RECEIVE_DATE_REQUEST = 'RECEIVE_DATE_REQUEST';
export const RECEIVE_DATE_REQUESTS = 'RECEIVE_DATE_REQUESTS';
export const REMOVE_DATE_REQUEST = 'REMOVE_DATE_REQUEST'


const receiveDateRequest = dateRequest => ({
    type: RECEIVE_DATE_REQUEST,
    dateRequest
});

const receiveDateRequests = dateRequests => ({
    type: RECEIVE_DATE_REQUESTS,
    dateRequests
});

const removeDateRequest = dateRequestId => ({
    type: REMOVE_DATE_REQUEST,
    dateRequestId
})

export const getDateRequest = dateRequestId => state => {
    return state?.dateRequests ? state.dateRequests[dateRequestId] : null;
};

export const getDateRequests = state => {
    return state?.dateRequests ? Object.values(state.dateRequests) : [];
};


export const fetchDateRequest = (dateRequestId) => async (dispatch) => {
    const response = await jwtFetch(`/api/dateRequests/${dateRequestId}`);

    if (response.ok) {
        const dateRequest = await response.json();
        dispatch(receiveDateRequest(dateRequest));
    }
};

export const fetchDateRequests = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/dateRequests${userId}`);

    if (response.ok) {
        const dateRequests = await response.json();
        dispatch(receiveDateRequests(dateRequests));
    }
};

export const fetchDateRequestsFiltered = userId => async (dispatch) => {
    const response = await jwtFetch(`/api/dateRequests/${userId}`);

//     if (response.ok) {
//         const dateRequests = await response.json();
//         dispatch(receiveDateRequests(dateRequests));
//     }
// }

// export const fetchDateRequestsPendingInvitee = userId => async (dispatch) => {
//     const response = await jwtFetch(`/api/dateRequests/${userId}/pending/invitee`);

//     if (response.ok) {
//         const dateRequests = await response.json();
//         dispatch(receiveDateRequests(dateRequests));
//     }
// }

// export const fetchDateRequestsRejected = userId => async (dispatch) => {
//     const response = await jwtFetch(`/api/dateRequests/${userId}/rejected/creator`);

//     if (response.ok) {
//         const dateRequests = await response.json();
//         dispatch(receiveDateRequests(dateRequests));
//     }
// }

export const updateDateRequest = dateRequest => async (dispatch) => {
    const response = await jwtFetch(`/api/dateRequests/${dateRequest._id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dateRequest)
    });

    if (response.ok) {
        const dateRequest = await response.json();
        dispatch(receiveDateRequest(dateRequest))
    }
};

export const createDateRequest = dateRequest => async (dispatch) => {
    const response = await jwtFetch(`/api/dateRequests/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dateRequest)
    });

    if (response.ok) {
        const dateRequest = await response.json();
        dispatch(receiveDateRequest(dateRequest))
    }
};

export const deleteDateRequest = dateRequestId => async (dispatch) => {
    const response = await jwtFetch(`/api/dateRequests/${dateRequestId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeDateRequest(dateRequestId))
    }
} 


const dateRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DATE_REQUESTS:
        return {...action.dateRequests};
    case RECEIVE_DATE_REQUEST:
        return {...state, [action.dateRequest._id]: action.dateRequest};
    case REMOVE_DATE_REQUEST:
        const newState = {...state};
        delete newState[action.dateRequestId];
        return newState;
    default:
      return state;
  }
};

export default dateRequestReducer;

