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
        <div className="request-info-container">
            <p>Owner name: {invitee.name}</p>
            <p>Puppy name: {invitee.puppyName}</p>
            <button onClick={handleDeleteRequest} id="delete-date-button">Delete Request</button>
        </div>
    )
};

export default DateRequestInfoContainer;