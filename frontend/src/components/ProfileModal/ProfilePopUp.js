import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory } from 'react-router-dom';
import { fetchUser, getUser } from "../../store/users";
import "./ProfilePopUp.css";

const ProfilePopUp = ({userId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const otherUser = useSelector(getUser(userId));
    const sessionUser = useSelector((state) => state.session.user);
    const isFriend = sessionUser.friends.includes(userId);
    // const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId]);

    if (!otherUser) return null;

    const handleCreateDate = e => {
        e.preventDefault();
        // setSelectedUserId(userId)
        history.push('/createDate', {sessionUser, otherUser});
    };

    const handleAddFriend = e => {
        e.preventDefault();
        // dispatch(createFriend);
    };

    const handleMessage = e => {
        e.preventDefault();
        history.push(`/messages/${userId}`)
        // hide the userid 
    };

    return (
        <div className="profile-modal">
            <img className="modal-profile-image" src={otherUser.profileImageUrl} alt="profile"/>
            <div className="puppy-details-section"> 
                <h1 id="puppy-profile-details-text">Puppy Profile</h1>
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
                    <h2 id="owner-age-text">Age: </h2>
                    <h3 id='owner-age'>{otherUser.age}</h3>
                </div> 
                <div className="profile-modal-buttons">   
                    {isFriend ? (
                        <button id="create-event-button" onClick={handleCreateDate}>Create Play Date</button>
                        ) : (
                        <button id="add-friend-button" onClick={handleAddFriend}>Add Friend</button>
                    )}
                    <button id="message-button" onClick={handleMessage}>Message</button>
                </div> 
                
            </div>
        </div>
    );
};

export default ProfilePopUp;