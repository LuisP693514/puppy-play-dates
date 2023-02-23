import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDateRequest, fetchDateRequest, getDateRequest, updateDateRequest } from "../../store/dateRequests";
import { createDate } from "../../store/dates";
import { fetchUser, getUser } from "../../store/users";


const DateRequestContainer = ({requestId}) => {
    const dispatch = useDispatch();
    const dateRequest = useSelector(getDateRequest(requestId));
    const otherUser = useSelector(getUser(dateRequest.invitee))

    useEffect(() => {
        dispatch(fetchDateRequest(requestId))
        dispatch(fetchUser(dateRequest.invitee))
    }, [dispatch]);

    const handleAcceptDate = e => {
        e.preventDefault();
        dispatch(createDate({
            creator: dateRequest.creator,
            invitee: dateRequest.invitee,
            name: dateRequest.name,
            date: dateRequest.date,
            latitude: dateRequest.latitude,
            longitude: dateRequest.longitude
        }))
        // dispatch(updateDateRequest({...dateRequest, status: 'accepted'}))
        dispatch(deleteDateRequest(requestId))
    };

    const handleDeclineDate = e => {
        e.preventDefault();
        dispatch(updateDateRequest({...dateRequest, status: 'declined'}))
    }

    if (!dateRequest) return null;
    if (!otherUser) return null;

    return (
        <div className="date-container">
            <div>{otherUser.puppyName}</div>
            <div>{dateRequest.name}</div> 
            <div>{dateRequest.date}</div>
            <div>{dateRequest.description}</div>
            <button id='accept-date' onClick={handleAcceptDate}>Accept</button>
            <button id='decline-date' onClick={handleDeclineDate}>Decline</button>
        </div>
    )
};

export default DateRequestContainer;