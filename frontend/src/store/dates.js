import jwtFetch from "./jwt";

export const RECEIVE_DATE = 'RECEIVE_DATE';
export const RECEIVE_DATES = 'RECEIVE_DATES';
export const REMOVE_DATE = 'REMOVE_DATE'


const receiveDate = date => ({
    type: RECEIVE_DATE,
    date
});

const receiveDates = dates => ({
    type: RECEIVE_DATES,
    dates
});

const removeDate = dateId => ({
    type: REMOVE_DATE,
    dateId
})


export const getDate = dateId => state => {
    return state?.dates ? state.dates[dateId] : null;
};

export const getDates = state => {
    return state?.dates ? Object.values(state.dates) : [];
};


export const fetchDate = (dateId) => async (dispatch) => {
    const response = await jwtFetch(`/api/dates/${dateId}`);

    if (response.ok) {
        const date = await response.json();
        dispatch(receiveDate(date));
    }
};

export const fetchDates = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/${userId}/dates`);

    if (response.ok) {
        const dates = await response.json();
        dispatch(receiveDates(dates));
    }
};

export const updateDate = date => async (dispatch) => {
    const response = await jwtFetch(`/api/dates/${date.id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(date)
    });

    if (response.ok) {
        const date = await response.json();
        dispatch(receiveDate(date))
    }
};

export const createDate = date => async (dispatch) => {
    const response = await jwtFetch(`/api/dates`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(date)
    });

    if (response.ok) {
        const date = await response.json();
        dispatch(receiveDate(date))
    }
};

export const deleteDate = dateId => async (dispatch) => {
    const response = await jwtFetch(`/api/dates/${dateId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeDate(dateId))
    }
} 


const dateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DATES:
        return {...action.dates};
    case RECEIVE_DATE:
        return {...state, [action.date.id]: action.date};
    case REMOVE_DATE:
        const newState = {...state};
        delete newState[action.dateId];
        return newState;
    default:
      return state;
  }
};

export default dateReducer;

