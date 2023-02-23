import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest, updateFriendRequest } from "../../../store/friendRequests";
import { createFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";

const FriendRequestContainer = ({request, currentUser}) => {
    const dispatch = useDispatch();
    const creator = useSelector(getUser(request.creator))

    useEffect(() => {
        dispatch(fetchUser(request.creator))
    }, [dispatch])

    const handleAcceptRequest = e => {
        e.preventDefault();
        dispatch(createFriend({
            friend: request.creator,
            user: currentUser._id
        }))
        dispatch(createFriend({
            friend: currentUser._id,
            user: request.creator
        }))
        dispatch(deleteFriendRequest(request._id))
    }

    const handleRejectRequest = e => {
        e.preventDefault();
        dispatch(updateFriendRequest({...request, status: 'rejected'}))
    }

    if (!creator) return null;

    return (
        <div className="request-info-container">
            <p>Owner name: {creator.name}</p>
            <p>Puppy name: {creator.puppyName}</p>
            <button onClick={handleAcceptRequest} id="accept-friend-button">Accept</button>
            <button onClick={handleRejectRequest} id="reject-friend-button">Reject</button>
        </div>
    )
};

export default FriendRequestContainer;