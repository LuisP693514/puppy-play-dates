import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../../store/users";
import { deleteDateRequest } from "../../../store/dateRequests";

const DateRequestInfoContainer = ({request}) => {
    const dispatch = useDispatch();
    const invitee = useSelector(getUser(request.invitee))

    useEffect(() => {
        dispatch(fetchUser(request.invitee))
    }, [dispatch])

    const handleDeleteRequest= e => {
        e.preventDefault();
        dispatch(deleteDateRequest(request._id))
    }

    if (!invitee) return null;

    return (
        <>
            <img className="profile-friend-image"src={invitee.profileImageUrl}/>
            <div className="pending-info">
                <div>
                    <p>Placeholder{invitee.name} & Placeholder{invitee.puppyName}</p>
                </div>
                <div>
                    <button className="delete-request" onClick={handleDeleteRequest} id="delete-date-button">-Delete Request-</button>
                </div>
            </div>
        </>

    )
};

export default DateRequestInfoContainer;