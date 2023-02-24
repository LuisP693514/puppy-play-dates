import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'

const FriendContainer = ({friend}) => {
    // this shows friend id on table, and gets userId
    const dispatch = useDispatch();
    const friendUser = useSelector(getUser(friend.friend))
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('')

    useEffect(() => {
        dispatch(fetchUser(friend.friend))
    })

    if (!friendUser) return null

    const handleUnfriend = e => {
        e.preventDefault();
        dispatch(deleteFriend(friend._id))
    }


    return (
        <div className="friend-container">
            <button className="friend-info" onClick={() => {
                    setShowModal(true);
                    setSelectedUserId(friendUser._id);}}>
                <img className="profile-friend-image" src={friendUser.profileImageUrl} alt="profile" />
                <p>Owner name: {friendUser.name}</p>
                <p>Puppy name: {friendUser.puppyName}</p>
            </button>
            <button onClick={handleUnfriend} id="unfriend-button">Unfriend</button>
        {<ProfilePopUp userId={selectedUserId} open={showModal} profileClose={() => setShowModal(false)}></ProfilePopUp>}
        </div>
    )
};

export default FriendContainer;