import React from "react";
import reactDom from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory } from 'react-router-dom';
import { fetchUser, getUser } from "../../store/users";
import "./ProfilePopUp.css";
import { getCurrentUser, selectCurrentUser } from "../../store/session";
import { createFriendRequest } from "../../store/friendRequests";
import { deleteFriend } from "../../store/friends";

const ProfilePopUp = ({userId, open, profileClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const otherUser = useSelector(getUser(userId));
    const sessionUser = useSelector(selectCurrentUser);
    const currentUser = useSelector(getUser(sessionUser._id))
    const isFriend = currentUser?.friends.includes(userId);
    const isFriendRequest = currentUser?.friendRequests.includes(userId);
    debugger

    useEffect(() => {
        dispatch(fetchUser(userId))
        dispatch(getCurrentUser())
    }, [dispatch, userId]);

    if (!currentUser) return null;
    if (!otherUser) return null;

    const handleCreateDateRequest = e => {
        e.preventDefault();
        history.push('/createDate', {currentUser, otherUser});
    };

    const handleAddFriend = e => {
        e.preventDefault();
        dispatch(createFriendRequest({
            sender: currentUser._id,
            receiver: otherUser._id,
            status: 'pending'
        })) 
    };

    const handleDeleteFriend = e => {
        e.preventDefault();
        dispatch(deleteFriend({
            friend: otherUser._id,
            user: currentUser._id
        }))
        dispatch(deleteFriend({
            friend: currentUser._id,
            user: otherUser._id
        }))
    };

    // const handleMessage = e => {
    //     e.preventDefault();
    //     history.push(`/messages/${userId}`)
    //     // hide the userid 
    // };

    if (!open) return null
    return reactDom.createPortal(
        <>
            <div className="profile-modal">
            <button onClick={profileClose} className="modal-close">&times;</button>
                <img className="modal-profile-image" src={otherUser.profileImageUrl} alt="profile"/>
                <div className="puppy-details-section"> 
                    <div className="dog-name-section">
                        <h2 id="dog-name-text">Name: </h2>
                        <h3 id='dog-name'>{otherUser.puppyName}</h3>
                    </div>
                    <div className="dog-age-section">
                        <p id="dog-age-text">Age: </p>
                        <p id='dog-age'>{otherUser.puppyAge}</p>
                    </div>
                    <div className="dog-breed-section">
                        <p id="dog-breed-text">Breed: </p>
                        <p id='dog-breed'>{otherUser.puppyBreed}</p>
                    </div>
                    <div className="dog-temperament-section">
                        <p id="dog-temperament-text">Temperament: </p>
                        <p id='dog-temperament'>{otherUser.puppyTemperament}</p>
                    </div>
                    <div className="dog-vacc-section">
                        <p id="dog-vacc-text">Vaccinated: </p>
                        <p id='dog-vacc'>{otherUser.puppyVaccinated}</p>
                    </div>
                </div>
                <div className="owner-details-section">
                    <h4 id="owner-profile-details-text">Owner's Profile</h4>
                    <div className="owner-name-section">
                        <h5 id="owner-name-text">Name: </h5>
                        <h6 id='owner-name'>{otherUser.name}</h6>
                    </div>
                    <div className="owner-age-section">
                        <h5 id="owner-age-text">Age: </h5>
                        <h6 id='owner-age'>{otherUser.age}</h6>
                    </div> 
                    <div className="profile-modal-buttons">   
                        {isFriend ? (
                            <div>
                                <button className="button"id="create-event-button" onClick={handleCreateDateRequest}>Create Play Date</button>
                                <button id='delete-friend-on-modal' onClick={handleDeleteFriend}>Delete Friend</button>
                            </ div>
                            ) : (<br/>)}
                        {(!isFriendRequest && !isFriend) ? (<button className="button" id="add-friend-button" onClick={handleAddFriend}>Add Friend</button>) : (<br />)}
                           
                        {/* <button id="message-button" onClick={handleMessage}>Message</button> */}
                    </div> 
                    
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default ProfilePopUp;