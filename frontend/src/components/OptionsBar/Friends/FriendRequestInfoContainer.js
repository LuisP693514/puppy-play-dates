import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest } from "../../../store/friendRequests";
import { fetchUser, getUser } from "../../../store/users";

const FriendRequestInfoContainer = ({request}) => {
    const dispatch = useDispatch();
    const invitee = useSelector(getUser(request.invitee))

    useEffect(() => {
        dispatch(fetchUser(request.invitee))
    }, [dispatch])

    const handleDeleteRequest= e => {
        e.preventDefault();
        dispatch(deleteFriendRequest(request._id))
    }

    if (!invitee) return null;

    return (
        <div className="request-info-container">
            <p>Owner name: {invitee.name}</p>
            <p>Puppy name: {invitee.puppyName}</p>
            <button onClick={handleDeleteRequest} id="unfriend-button">Delete Request</button>
        </div>
    )
};

export default FriendRequestInfoContainer;