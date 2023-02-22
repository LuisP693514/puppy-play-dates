import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateRequest, getDateRequest } from "../../store/dateRequests";
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
        
    }

    if (!dateRequest) return null;
    if (!otherUser) return null;

    return (
        <div className="date-container">
            <div>{dateRequest.name}</div> 
            {/* need to get the otherUser name */}
            <button id='accept-date' onClick={handleAcceptDate}>Accept</button>
            {/* <button id='decline-date' onClick={handleDeclineDate}>Decline</button> */}
        </div>
    )
};

export default DateRequestContainer;