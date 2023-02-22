import jwtFetch from "./jwt";
export const RECIEVE_MARKERS = 'RECEIVE_MARKERS'

const receiveMarkers = markers => {
    return {
        type: RECIEVE_MARKERS,
        markers
    }
}

export const getMarkers = state => {
    return state?.markers ? Object.values(state.markers) : []
}

export const fetchMarkers = () => async (dispatch) => {
    const response = await jwtFetch(`/api/markers/allMarkers`)

    if(response.ok) {
        const markers = await response.json();
        dispatch(receiveMarkers(markers))
    }
}

const markersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_MARKERS:
            return {...action.markers}
        default:
            return state
    }
}

export default markersReducer;