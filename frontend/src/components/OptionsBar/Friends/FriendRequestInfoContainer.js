import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest } from "../../../store/friendRequests";
import { fetchUser, getUser } from "../../../store/users";
import ProfilePopUp from "../../ProfileModal/ProfilePopUp";
import './Friends.css'


const FriendRequestInfoContainer = ({request, showPendingModal, setPendingShowModal, closeAllModals}) => {
    const dispatch = useDispatch();
    const receiver = useSelector(getUser(request.receiver))
    const [selectedUserId, setSelectedUserId] = useState('')


    useEffect(() => {
        dispatch(fetchUser(request.receiver))
    }, [dispatch])

    const handleDeleteRequest= e => {
        e.preventDefault();
        dispatch(deleteFriendRequest(request._id))
    }

    if (!receiver) return null;

    return (
        <div className="request-info-container">
            <button className="friend-info" onClick={() => {
                    closeAllModals();
                    setPendingShowModal(true);
                    setSelectedUserId(receiver._id);
                    }}>
                <div>
                    <img className="profile-friend-image" src={receiver.profileImageUrl}/>
                </div>
            </button>
            <div className="pending-info">
                <p>{receiver.name} & {receiver.puppyName}</p>
                <button onClick={handleDeleteRequest} className="delete-request" id="unfriend-button">-Delete Request-</button>
            </div>
            <div>
                {<ProfilePopUp pending={true} userId={selectedUserId} open={showPendingModal} profileClose={() => setPendingShowModal(false)}></ProfilePopUp>}
            </div>
        </div>
    )
};

export default FriendRequestInfoContainer;