import React from 'react'

import { useEffect } from 'react';
import reactDom from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFriendRequests, getFriendRequests } from '../../../store/friendRequests';
import { fetchFriends, getFriends } from '../../../store/friends';
import { getCurrentUser, selectCurrentUser } from '../../../store/session';
import FriendRequestInfoContainer from './FriendRequestInfoContainer';
import FriendRequestContainer from './FriendRequestContainer';
import FriendContainer from './FriendContainer';


import './Friends.css'

const Friends = ({open, friendsClose})  => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const friends = useSelector(getFriends);
    const friendRequests = useSelector(getFriendRequests);

    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchFriends(currentUser._id))
        dispatch(fetchFriendRequests(currentUser._id))
    }, [dispatch])


    if (!friends) return null;
    if (!friendRequests) return null;


    const pendingCreator = friendRequests.filter(request => (
        request.status === 'pending' && request.sender === currentUser._id
    ));

    const pendingInvitee = friendRequests.filter(request => (
        request.status === 'pending' && request.receiver === currentUser._id
    ));

    const rejected = friendRequests.filter(request => (
        request.status === 'rejected' && request.sender === currentUser._id
    ));


    if (!open) return null
    return reactDom.createPortal(
        <div className="options-modal">
            TESTING FRIENDS
                <div className='friends-index-container'>
                    <h1 id='friend-list'>Friends</h1>
                    <div id='friend-index'>
                        {friends.map(friend => {
                            return(<div id='friend-item'>
                                        <FriendContainer friend={friend}/>
                                    </div>)
                        })}
                    </div>
                </div>
                <div className='friend-request-index-container'> 
                    <h2 id='friend-requests'>Friend Requests</h2>
                    <div id='friend-request-index'>
                        {pendingInvitee.map(request => {
                            return (<div id='friend-item'>
                                        <FriendRequestContainer request={request}/>
                                    </div>)
                        })}
                    </div>
                </div>
                <div className='friend-pending-index-container'> 
                    <h2 id='friend-requests'>Pending Friend Requests</h2>
                    <div id='friend-request-index'>
                        {pendingCreator.map(request => {
                            return (<div id='friend-item'>
                                        <FriendRequestInfoContainer request={request}/>
                                    </div>)
                        })}
                    </div>
                </div>
                <div className='pending-rejected-index-container'> 
                    <h2 id='friend-requests'>Rejected Friend Requests</h2>
                    <div id='friend-request-index'>
                        {rejected.map(request => {
                            return (<div id='friend-item'>
                                        <FriendRequestInfoContainer request={request}/>
                                    </div>)
                        })}
                    </div>
                </div>
            <button onClick={friendsClose} className="modal-close">&times;</button>
        </div>,
        document.getElementById("portal")
    )
};

export default Friends;
