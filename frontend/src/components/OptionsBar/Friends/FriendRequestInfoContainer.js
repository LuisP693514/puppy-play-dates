import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest } from "../../../store/friendRequests";
import { fetchUser, getUser } from "../../../store/users";

const FriendRequestInfoContainer = ({request}) => {
    const dispatch = useDispatch();
    const receiver = useSelector(getUser(request.receiver))

    useEffect(() => {
        dispatch(fetchUser(request.receiver))
    }, [dispatch])

    const handleDeleteRequest= e => {
        e.preventDefault();
        dispatch(deleteFriendRequest(request._id))
    }

    if (!receiver) return null;

    return (
        <div className="request-info-container">
            <p>Owner name: {receiver.name}</p>
            <p>Puppy name: {receiver.puppyName}</p>
            <button onClick={handleDeleteRequest} id="unfriend-button">Delete Request</button>
        </div>
    )
};

export default FriendRequestInfoContainer;