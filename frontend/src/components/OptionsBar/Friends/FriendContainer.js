import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend } from "../../../store/friends";
import { fetchUser, getUser } from "../../../store/users";

const FriendContainer = ({friend}) => {
    // this shows friend id on table, and gets userId
    const dispatch = useDispatch();
    const friendUser = useSelector(getUser(friend.user))

    useEffect(() => {
        dispatch(fetchUser(friend.user))
    })

    if (!friendUser) return null

    const handleUnfriend = e => {
        e.preventDefault();
        dispatch(deleteFriend(friend._id))
    }

    return (
        <div className="friend-container">
            <p>Owner name: {friendUser.name}</p>
            <p>Puppy name: {friendUser.puppyName}</p>
            <button onClick={handleUnfriend} id="unfriend-button">Unfriend</button>
        </div>
    )
};

export default FriendContainer;