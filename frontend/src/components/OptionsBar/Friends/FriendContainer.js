import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, fetchFriend, getFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'

const FriendContainer = ({friend, showFriendModal, setShowFriendModal, closeAllModals}) => {
    // friend is the friendId of the table not the actual friend
    const dispatch = useDispatch();
    // const friendInfo = useSelector(getFriend(friend._id));
    const friendUser = useSelector(getUser(friend?.friend))
    const [selectedUserId, setSelectedUserId] = useState('')

    useEffect(() => {
        // dispatch(fetchFriend(friend._id))
        // dispatch(fetchUser(friend.friend))
    })

    if (!friend) return null;
    if (!friendUser) return null;

    const handleUnfriend = e => {
        e.preventDefault();
        dispatch(deleteFriend(friend._id))
    }


    return (
        <div className="friend-container">
            <button className="friend-info" onClick={() => {
                    closeAllModals()
                    setShowFriendModal(true);
                    setSelectedUserId(friendUser._id);}}>
                <div className="">
                    <img className="profile-friend-image" src={friendUser.profileImageUrl} alt="profile" />
                </div>
                <div>
                    <div className="friends-names">
                    <p>{friendUser.name} & {friendUser.puppyName}</p>
                    </div>
                    <div>
                        {/* <button onClick={handleUnfriend} id="unfriend-button">Unfriend</button> */}
                        {<ProfilePopUp userId={selectedUserId} open={showFriendModal} profileClose={() => setShowFriendModal(false)}></ProfilePopUp>}
                    </div>
                </div>
            </button>
        </div>
    )
};

export default FriendContainer;