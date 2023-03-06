import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriendRequest } from "../../../store/friendRequests";
import { fetchUser, getUser } from "../../../store/users";
import './Friends.css'


const FriendRequestInfoContainer = ({request}) => {
    const dispatch = useDispatch();
    const receiver = useSelector(getUser(request.receiver))

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
            <div>
                <img className="profile-friend-image" src={receiver.profileImageUrl}/>
            </div>
            <div className="pending-info">
                <p>{receiver.name} & {receiver.puppyName}</p>
                <button onClick={handleDeleteRequest} className="delete-request" id="unfriend-button">-Delete Request-</button>
            </div>
        </div>
    )
};

export default FriendRequestInfoContainer;