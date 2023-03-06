import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest, updateFriendRequest } from "../../../store/friendRequests";
import { createFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";
import './Friends.css'


const FriendRequestContainer = ({request}) => {
    const dispatch = useDispatch();
    const sender = useSelector(getUser(request.sender))

    useEffect(() => {
        dispatch(fetchUser(request.sender))
    }, [dispatch])

    const handleAcceptRequest = e => {
        e.preventDefault();
        dispatch(createFriend({
            friendId: request.receiver,
            userId: request.sender
        }))
        dispatch(deleteFriendRequest(request._id))
    }

    const handleRejectRequest = e => {
        e.preventDefault();
        dispatch(deleteFriendRequest(request._id))
    }

    if (!sender) return null;

    return (
        <div className="request-info-container">
            <div>
                <img className="profile-friend-image" src={sender.profileImageUrl}/>
            </div>
            <div className="request-info">
                <p>{sender.name} & {sender.puppyName}</p>
                <button className="" onClick={handleAcceptRequest} id="accept-friend-button">- Confirm -</button>
                <button className="" onClick={handleRejectRequest} id="reject-friend-button">- Decline -</button>
            </div>
        </div>
    )
};

export default FriendRequestContainer;