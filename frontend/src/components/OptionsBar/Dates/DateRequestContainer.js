import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDateRequest, fetchDateRequest, getDateRequest, updateDateRequest } from "../../../store/dateRequests";
import { createDate } from "../../../store/dates";
import { fetchUser, getUser } from "../../../store/users";
import DatePopUp from "./DatePopUp";


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
        <>
            <button>
                <div className="date-info-container">

                    <div className="request-spacing">
                    <img className="profile-friend-image" src={otherUser.profileImageUrl}/>
                    </div>
                    <div className="pending-info">
                        <div>Placeholder {otherUser.username} & Placeholder{otherUser.puppyName}</div>
                        <div className="date-request-buttons">
                            <button  id='reject-friend-button' onClick={handleDeclineDate}>-Decline-</button>
                            <button className="delete-request accept-button" id='accept-date' onClick={handleAcceptDate}>-Accept-</button>
                        </div>
                    </div>
                </div>
            </button>
            {/* <DatePopUp/> */}
        </>
    )
};

export default DateRequestContainer;