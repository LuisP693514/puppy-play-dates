import reactDom from 'react-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchFriendRequests, getFriendRequests } from '../../../store/friendRequests';
import { fetchFriends, getFriends } from '../../../store/friends';
import { getCurrentUser, selectCurrentUser } from '../../../store/session';
import FriendRequestInfoContainer from './FriendRequestInfoContainer';
import FriendRequestContainer from './FriendRequestContainer';
import FriendContainer from './FriendContainer';
import ProfilePopUp from '../../ProfileModal/ProfilePopUp';
import './Friends.css'
import Search from '../../Search';

const Friends = ({ open, friendsClose }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const friends = useSelector(getFriends);
    const friendRequests = useSelector(getFriendRequests);
    const [showFriendModal, setShowFriendModal] = useState(false);
    const [showPendingModal, setPendingShowModal] = useState(true)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [prevId, setPrevId] = useState('')
    const [fromRequestsModal, setFromRequestsModal] = useState(true);
    const [visible, setVisible] = useState(false);
   
    const closeAllModals = () => {
        setShowFriendModal(false)
        setPendingShowModal(false)
        setShowRequestModal(false)
    }

    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchFriends(currentUser._id))
        dispatch(fetchFriendRequests(currentUser._id))
    }, [dispatch])

    if (!friends) return null;
    if (!friendRequests) return null;


    const pendingCreator = friendRequests.filter(request => (
        request?.status === 'pending' && request?.sender === currentUser._id
    ));

    const pendingInvitee = friendRequests.filter(request => (
        request?.status === 'pending' && request?.receiver === currentUser._id
    ));

    function friendsList() {
        if (friends.length){
            return (
                <div id='friend-index'>
                    {friends.map(friend => {
                        return (<div id='friend-item'>
                            <FriendContainer friend={friend} showFriendModal={showFriendModal} setShowFriendModal={setShowFriendModal} closeAllModals={closeAllModals} />
                        </div>)
                    })}
                </div>
            )
        } else {
            return (
                <div className="date-spacer">
                    <div className="spacer">Click profiles on the map to start adding friends.</div>
                    <div>Once they have accepted your invitation, they will show up here.</div>
                </div>
            )
        }
    }

    function friendReqList() {

        if (pendingInvitee.length) {
            return (
                <>
                    <h6 className='friend-list'>FRIEND REQUESTS:</h6>
                    <div id='friend-request-index'>
                        {pendingInvitee.map(request => {
                            return (<div id='friend-item'>
                                <FriendRequestContainer request={request} showRequestModal={showRequestModal} setShowRequestModal={setShowRequestModal} closeAllModals={closeAllModals} />
                            </div>)
                        })}
                    </div>
                </>)
        } else {
            return <></>
        }
    }

    function pendingRequests() {
        if (pendingCreator.length) {
            return (<>
                <h6 className='friend-list'>PENDING REQUESTS:</h6>
                <div id='friend-request-index'>
                    {pendingCreator.map(request => {
                        return (<div id='friend-item'>
                            <FriendRequestInfoContainer setVisible={setVisible} request={request} showPendingModal={showPendingModal} setPendingShowModal={setPendingShowModal} closeAllModals={closeAllModals} prevId={prevId} setPrevId={setPrevId} />
                            <ProfilePopUp 
                                userId={request.receiver}
                                open={showPendingModal}
                                profileClose={() => setPendingShowModal(false)}
                                setVisible={setVisible}
                                fromRequestsModal={fromRequestsModal}
                            />
                        </div>)
                    })}
                </div>
            </>)
        } else {
            return <></>
        }
    }


    if (!open) return null
    return reactDom.createPortal(
        <div className="friends-modal">
            <div className="overflow">
                <div className='friends-index-container'>
                    <h5 className='friend-list'>FRIENDS:</h5>
                    {friendsList()}
                </div>
                <div className='friend-request-index-container'>
                    {friendReqList()}
                </div>
                <div className='friend-pending-index-container'>
                    {pendingRequests()}
                </div>
                <button onClick={friendsClose} className="modal-close">&times;</button>
            </div>
        </div>,
        document.getElementById("portal")
    )
};

export default Friends;
