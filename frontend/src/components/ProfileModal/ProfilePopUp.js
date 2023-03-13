import { useState } from "react";
import reactDom from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchUser, getUser } from "../../store/users";
import "./ProfilePopUp.css";
import { getCurrentUser, selectCurrentUser } from "../../store/session";
import { createFriendRequest, fetchFriendRequests, getFriendRequests } from "../../store/friendRequests";
import { fetchFriends, getFriends } from "../../store/friends";

const ProfilePopUp = ({ userId, open, profileClose, pending, fromRequestsModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const otherUser = useSelector(getUser(userId));
    const sessionUser = useSelector(selectCurrentUser);
    const currentUser = useSelector(getUser(sessionUser?._id));
    const friendList = useSelector(getFriends);
    const friendRequests = useSelector(getFriendRequests);
    const [friendRequestStatus, setFriendRequestStatus] = useState({});

    useEffect(() => {
        if (userId) dispatch(fetchUser(userId));
        dispatch(getCurrentUser());
        dispatch(fetchFriends(sessionUser?._id));
        dispatch(fetchFriendRequests(currentUser?._id))
    }, [dispatch, userId]);

    const pendingCreator = friendRequests.find(request => (
        request?.status === 'pending' && request?.sender === userId
    ));

    const pendingInvitee = friendRequests.find(request => (
        request?.status === 'pending' && request?.receiver === userId
    ));

    if (!currentUser) return null;
    if (!otherUser) return null;

    //Look to see if friends has both the current user and the friend as an entry in friends list
    let isFriend;
    const checkIfBothUsersAreFriends = (u, fr) => {
        if (friendList?.length > 0) {
            for (let i = 0; i < friendList.length; i++) {
                const friendObj = friendList[i];
                if (friendObj.user === u._id && friendObj.friend === fr._id) {
                    isFriend = true;
                    break;
                } else if (friendObj.user === fr._id && friendObj.friend === u._id) {
                    isFriend = true;
                    break;
                }
            }
        } else {
            isFriend = false;
        }
    }
    checkIfBothUsersAreFriends(currentUser, otherUser)
    const handleCreateDateRequest = e => {
        e.preventDefault();
        history.push('/createDate', { currentUser, otherUser });
    };

    const handleAddFriend = e => {
        e.preventDefault();
        dispatch(createFriendRequest({
            sender: currentUser._id,
            receiver: otherUser._id,
            status: 'pending'
        }));
        setFriendRequestStatus({
            ...friendRequestStatus,
            [currentUser._id]: 'pending',
            [otherUser._id]: 'pending'
        });
    };

    // const isPendingFriend = friendRequestStatus[currentUser._id] === 'pending' && friendRequestStatus[otherUser._id] === 'pending';
    const isPendingFriend = pendingInvitee || pendingCreator || pending || (friendRequestStatus[currentUser._id] === 'pending' && friendRequestStatus[otherUser._id] === 'pending');




    if (!open) return null
    return reactDom.createPortal(
        <>
            <div className={`profile-modal ${fromRequestsModal ? 'hidden' : ''}`} id={userId}>
                <button onClick={() => profileClose(false)} className="modal-close">&times;</button>
                <div className="dog-name-section"><h2 id='dog-name'>{otherUser.puppyName}</h2></div>
                <div className="pop-up-img"><img className="modal-profile-image" src={otherUser.profileImageUrl} alt="profile" /></div>
                <div className="puppy-details-section">
                    <div className="dog-age-section">
                        <span id="dog-age-text">Age: </span>
                        <span id='dog-age'>{otherUser.puppyAge}</span>
                    </div>
                    <div className="dog-breed-section">
                        <span id="dog-breed-text">Breed: </span>
                        <span id='dog-breed'>{otherUser.puppyBreed}</span>
                    </div>
                    <div className="dog-temperament-section">
                        <span id="dog-temperament-text">Temperament: </span>
                        <span id='dog-temperament'>{otherUser.puppyTemperament}</span>
                    </div>
                    <div className="dog-vacc-section">
                        <span id="dog-vacc-text">Vaccinated: </span>
                        <span id='dog-vacc'>{otherUser.puppyVaccinated ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="owner-name-section">
                        <span id="owner-name-text">Owner'sName: </span><span id='owner-name'>{otherUser.name}</span>
                    </div>
                    <div className="owner-age-section">
                        <span id="owner-age-text">Owner's Age: </span><span id='owner-age'>{otherUser.age}</span>
                    </div>

                </div>
                <div className="profile-modal-buttons">
                    {isFriend ? (
                        <div className="friend-profile-button-options">
                            <button className="button" id="create-event-button" onClick={handleCreateDateRequest}>Create Play Date</button>
                        </ div>
                    ) : (<br />)}

                    {(!isFriend && !isPendingFriend && (currentUser._id !== userId)) ? (
                    <button className="button" id="add-friend-button" onClick={handleAddFriend}>
                        <i className="fa-solid fa-bone white-text add-friend-bone"></i>Add Friend<i className="fa-solid fa-bone white-text add-friend-bone"></i>
                    </button>
                    ) : (<br />)}

                    {isPendingFriend ? (
                    <button className="button" disabled>Pending Friend Request</button>
                    ) : null}
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default ProfilePopUp;