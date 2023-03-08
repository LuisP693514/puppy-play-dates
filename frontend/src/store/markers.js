import jwtFetch from "./jwt";
export const RECIEVE_MARKERS = 'RECEIVE_MARKERS'
export const RECIEVE_MARKER = 'RECEIVE_MARKER'

const receiveMarkers = markers => {
    return {
        type: RECIEVE_MARKERS,
        markers
    }
}

const receiveMarker = marker => {
    return {
        type: RECIEVE_MARKER,
        marker
    }
}

export const getMarkers = state => {
    return state?.markers ? Object.values(state.markers) : []
}

export const getMarker = markerId => state => {
    return state?.markers ? state?.markers[markerId] : null
}

export const fetchMarkers = () => async (dispatch) => {
    const response = await jwtFetch(`/api/markers/allMarkers`)

    if(response.ok) {
        const markers = await response.json();
        dispatch(receiveMarkers(markers))
    }
}

export const fetchMarker = (markerId) => async (dispatch) => {
    const response = await jwtFetch(`/api/markers/${markerId}`)

    const marker = await response.json()
    dispatch(receiveMarker(marker))
}

export const createMarker = (markerObj) => async (dispatch) => {
    debugger
    const response = await jwtFetch(`/api/markers/create`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(markerObj)
    });

    const marker = await response.json();
    dispatch(receiveMarker(marker)) 
}

const markersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_MARKERS:
            return {...action.markers}
        case RECIEVE_MARKER:
            return {...state, [action.marker._id]: action.marker}
        default:
            return state
    }
}

export default markersReducer;