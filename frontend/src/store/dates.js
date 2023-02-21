import jwtFetch from "./jwt";

export const CREATE_DATE_REQUEST = 'CREATE_DATE_REQUEST';
export const CREATE_DATE_SUCCESS = 'CREATE_DATE_SUCCESS';
export const CREATE_DATE_FAILURE = 'CREATE_DATE_FAILURE';
export const RECEIVE_DATE = 'RECEIVE_DATE';
export const RECEIVE_DATES = 'RECEIVE_DATES';
export const REMOVE_DATE = 'REMOVE_DATE'


const createDateRequest = () => ({
  type: CREATE_DATE_REQUEST,
});

const createDateSuccess = (date) => ({
  type: CREATE_DATE_SUCCESS,
  payload: date,
});

const createDateFailure = (error) => ({
  type: CREATE_DATE_FAILURE,
  payload: error,
});

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


export const getCreatedDate = (state) => state.createDate.date;
export const isCreatingDate = (state) => state.createDate.isLoading;
export const getCreateDateError = (state) => state.createDate.error;

export const getDate = dateId => state => {
    return state?.dates ? state.dates[dateId] : null;
};

export const getDates = state => {
    return state?.dates ? Object.values(state.dates) : [];
};

export const createNewDate = (user1Id, user2Id, dateInfo) => async (dispatch) => {
  dispatch(createDateRequest());

  try {
    const response = await jwtFetch(`/api/dates`, {
      method: 'POST',
      body: JSON.stringify({ user1Id, user2Id, ...dateInfo }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const date = await response.json();
      dispatch(createDateSuccess(date));
    } else {
      const { error } = await response.json();
      dispatch(createDateFailure(error));
    }

  } catch (error) {
    dispatch(createDateFailure(error.message));
  }
};

export const fetchDate = (dateId) => async (dispatch) => {
    const response = await jwtFetch(`/api/dates/${dateId}`);

    if (response.ok) {
        const date = await response.json();
        dispatch(receiveDate(date));
    }
};

export const fetchDates = () => async (dispatch) => {
    const response = await jwtFetch(`/api/dates`);

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

export const deleteDate = dateId => async (dispatch) => {
    const response = await jwtFetch(`/api/date/${dateId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeDate(dateId))
    }
} 

const initialState = {
  date: null,
  isLoading: false,
  error: null,
};

const createDateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_DATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        date: action.payload,
      };
    case CREATE_DATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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

export default createDateReducer;

