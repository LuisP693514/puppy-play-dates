import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest, updateFriendRequest } from "../../../store/friendRequests";
import { createFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'


const FriendRequestContainer = ({request, showRequestModal, setShowRequestModal, closeAllModals}) => {
    const dispatch = useDispatch();
    const sender = useSelector(getUser(request.sender))
    const [selectedUserId, setSelectedUserId] = useState('')

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
            <button className="friend-info" onClick={() => {
                    closeAllModals();
                    setShowRequestModal(true);
                    setSelectedUserId(sender._id);
                    }}>
                <div>
                    <img className="profile-friend-image" src={sender.profileImageUrl}/>
                </div>
            </button>
            <div className="pending-info">
                <p>{sender.name} & {sender.puppyName}</p>
                <button className="" onClick={handleAcceptRequest} id="accept-friend-button">- Confirm -</button>
                <button className="" onClick={handleRejectRequest} id="reject-friend-button">- Decline -</button>
            </div>
            <div>
                {<ProfilePopUp pending={true} userId={selectedUserId} open={showRequestModal} profileClose={() => setShowRequestModal(false)}></ProfilePopUp>}
            </div>
        </div>
    )
};

export default FriendRequestContainer;