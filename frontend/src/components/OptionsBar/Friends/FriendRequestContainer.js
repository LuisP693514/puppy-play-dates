import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest, updateFriendRequest } from "../../../store/friendRequests";
import { createFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";

const FriendRequestContainer = ({request, currentUser}) => {
    const dispatch = useDispatch();
    const sender = useSelector(getUser(request.sender))

    useEffect(() => {
        dispatch(fetchUser(request.sender))
    }, [dispatch])

    const handleAcceptRequest = e => {
        e.preventDefault();
        dispatch(createFriend({
            friend: request.sender,
            user: currentUser._id
        }))
        dispatch(createFriend({
            friend: currentUser._id,
            user: request.sender
        }))
        dispatch(deleteFriendRequest(request._id))
    }

    const handleRejectRequest = e => {
        e.preventDefault();
        dispatch(updateFriendRequest({...request, status: 'rejected'}))
    }

    if (!sender) return null;

    return (
        <div className="request-info-container">
            <p>Owner name: {sender.name}</p>
            <p>Puppy name: {sender.puppyName}</p>
            <button onClick={handleAcceptRequest} id="accept-friend-button">Accept</button>
            <button onClick={handleRejectRequest} id="reject-friend-button">Reject</button>
        </div>
    )
};

export default FriendRequestContainer;