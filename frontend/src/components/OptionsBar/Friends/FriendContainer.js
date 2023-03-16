import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, fetchFriend, getFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'

const FriendContainer = ({ friend, showFriendModal, setShowFriendModal, setVisible, closeAllModals }) => {
    // friend is the friendId of the table not the actual friend
    const dispatch = useDispatch();
    // const friendInfo = useSelector(getFriend(friend._id));
    const friendUser = useSelector(getUser(friend?.friend))
    const [selectedUserId, setSelectedUserId] = useState('')

    useEffect(() => {
        // dispatch(fetchFriend(friend._id))
        // dispatch(fetchUser(friend.friend))
    }, [showFriendModal])

    if (!friend) return null;
    if (!friendUser) return null;

    const handleUnfriend = e => {
        e.preventDefault();
        dispatch(deleteFriend(friend._id))
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


    return (
        <div className="friend-container">
            <button className="friend-info" onClick={() => {
                closeVisible()
                closeAllModals()
                setShowFriendModal(true);
                setVisible(true)
                setSelectedUserId(friendUser._id);
                closeSiblings(friendUser._id)
            }}>
                <div className="">
                    <img className="profile-friend-image" src={friendUser.profileImageUrl} alt="profile" />
                </div>
                <div>
                    <div className="friends-names">
                        <p>{friendUser.name} & {friendUser.puppyName}</p>
                    </div>
                    <div>
                        {/* <button onClick={handleUnfriend} id="unfriend-button">Unfriend</button> */}
                    </div>
                </div>
            </button>
            {<ProfilePopUp userId={selectedUserId} open={showFriendModal} profileClose={setShowFriendModal}></ProfilePopUp>}
        </div>
    )
};

export default FriendContainer;