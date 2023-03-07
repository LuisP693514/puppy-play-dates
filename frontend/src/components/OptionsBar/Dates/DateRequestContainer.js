import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDateRequest, fetchDateRequest, getDateRequest, updateDateRequest } from "../../../store/dateRequests";
import { createDate } from "../../../store/dates";
import { fetchUser, getUser } from "../../../store/users";


const DateRequestContainer = ({request, currentUser}) => {
    const dispatch = useDispatch();
    const otherUser = useSelector(getUser(request.creator))

    useEffect(() => {
        dispatch(fetchUser(request.creator))
    }, [dispatch]);

    const handleAcceptDate = e => {
        e.preventDefault();
        dispatch(createDate({
            creator: request.creator,
            invitee: request.invitee,
            name: request.name,
            date: request.date,
            latitude: request.latitude,
            longitude: request.longitude
        }))
        dispatch(deleteDateRequest(request._id))
    };

    const handleDeclineDate = e => {
        e.preventDefault();
        dispatch(deleteDateRequest(request._id))
    }

    if (!otherUser) return null;

    return (
        <div className="date-container">
            <div>{otherUser.puppyName}</div>
            <div>{request.name}</div> 
            <div>{request.date}</div>
            <div>{request.description}</div>
            <button id='accept-date' onClick={handleAcceptDate}>Accept</button>
            <button id='decline-date' onClick={handleDeclineDate}>Decline</button>
        </div>
    )
};

export default DateRequestContainer;