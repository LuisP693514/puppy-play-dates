import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest, updateFriendRequest } from "../../../store/friendRequests";
import { createFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'


const FriendRequestContainer = ({request, showRequestModal, setShowRequestModal, setVisible, closeAllModals}) => {
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

    const closeVisible = () => {
        setVisible(false)
    }

    const closeSiblings = (id) => {

        const portal = document.getElementById('portal') // every profile that exists
        
        // hide all the children
        for (let i = 0; i < portal.children.length; i++) {
            const element = portal.children[i];
            if (Array.from(element.classList).includes('profile-modal')){
                element.classList.add('hidden')
            }
        }


        const profile = document.getElementById(id)
        if (profile && Array.from(profile.classList).includes('hidden')) {
            profile.classList.remove('hidden')
        }

    }

    if (!sender) return null;

    return (
        <div className="request-info-container">
            <button className="friend-info" onClick={() => {
                closeVisible()
                closeAllModals();
                setShowRequestModal(true);
                setVisible(true)
                setSelectedUserId(sender._id)
                closeSiblings(sender._id)
                    }}>
                <div>
                    <img className="profile-friend-image" src={sender.profileImageUrl}/>
                </div>
            </button>
            <div className="pending-info">
                <p>{sender.name} & {sender.puppyName}</p>
                <div>
                    <button className="" onClick={handleRejectRequest} id="reject-friend-button">-Decline-</button>
                    <button className="accept-button" onClick={handleAcceptRequest} id="accept-friend-button">-Confirm-</button>
                </div>
            </div>
            <div>
                {<ProfilePopUp pending={true} userId={selectedUserId} open={showRequestModal} profileClose={() => setShowRequestModal(false)}></ProfilePopUp>}
            </div>
        </div>
    )
};

export default FriendRequestContainer;